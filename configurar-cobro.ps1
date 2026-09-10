# ================================================================
#  perito.barcelona — puesta a punto del cobro (Wise + Stripe)
#  ---------------------------------------------------------------
#  Uso:   cd C:\Users\avila\dev\pb
#         powershell -ExecutionPolicy Bypass -File .\configurar-cobro.ps1
#
#  Qué hace, en orden:
#    1. Quita wrangler.toml, que hace que Pages ignore el panel.
#    2. Da de alta los secretos que faltan, uno a uno. Wrangler te
#       pide cada valor por teclado: NO se escriben en este fichero
#       ni pasan por ningún sitio más.
#    3. Construye el sitio.
#
#  Lo que NO hace, a propósito:
#    · No despliega. Eso lo decides tú, mirando el build.
#    · No toca el binding de Analytics Engine: eso es un campo del
#      panel y hay que corregirlo a mano (ver el aviso del final).
# ================================================================

$ErrorActionPreference = 'Stop'
$proyecto = 'pb'   # nombre REAL del proyecto en Cloudflare Pages

function Titulo($t) { Write-Host ''; Write-Host "== $t" -ForegroundColor Cyan }
function Ok($t)     { Write-Host "   OK  $t" -ForegroundColor Green }
function Aviso($t)  { Write-Host "   !   $t" -ForegroundColor Yellow }

# ── 0. Comprobación de que estamos donde toca ──────────────────
if (-not (Test-Path '.\package.json') -or -not (Test-Path '.\functions')) {
  throw "Esto no parece la raíz de pb. Haz 'cd C:\Users\avila\dev\pb' y vuelve a lanzarlo."
}

# ── 1. Fuera wrangler.toml ─────────────────────────────────────
#  Mientras exista, Pages deja de leer la configuración del panel:
#  perderías CRM_WEBAPP_URL y TURNSTILE_SECRET, y con ellas el
#  formulario de contacto. Además declara name = "perito-barcelona"
#  cuando el proyecto se llama "pb".
Titulo 'wrangler.toml'
if (Test-Path '.\wrangler.toml') {
  $seguido = (git ls-files --error-unmatch wrangler.toml) 2>$null
  if ($LASTEXITCODE -eq 0) {
    git rm -f wrangler.toml | Out-Null
    Ok 'borrado y marcado en git (queda por commitear)'
  } else {
    Remove-Item '.\wrangler.toml' -Force
    Ok 'borrado (no estaba en git)'
  }
} else {
  Ok 'ya no estaba'
}

# ── 2. Secretos que faltan ─────────────────────────────────────
#  `wrangler pages secret put` PIDE EL VALOR POR TECLADO. No se
#  escribe aquí, no queda en el historial de PowerShell y no viaja
#  a ningún sitio que no sea Cloudflare.
Titulo 'Secretos de Cloudflare Pages'
Write-Host '   Wrangler te pedirá cada valor. Pulsa Ctrl+C para saltarte el resto.' -ForegroundColor DarkGray

$secretos = @(
  @{ n = 'PERITIA_API_TOKEN';     q = 'Token compartido con el CRM. Invéntatelo largo y aleatorio, y guárdalo: el MISMO valor va luego en las propiedades del script de Apps Script.' },
  @{ n = 'STRIPE_SECRET_KEY';     q = 'Clave secreta de Stripe (sk_live_... o sk_test_...).' },
  @{ n = 'STRIPE_WEBHOOK_SECRET'; q = 'Signing secret del webhook de Stripe (whsec_...).' },
  @{ n = 'WISE_API_TOKEN';        q = 'Token de Wise, el de SOLO LECTURA.' }
)

foreach ($s in $secretos) {
  Write-Host ''
  Write-Host ("   -- {0}" -f $s.n) -ForegroundColor White
  Write-Host ("      {0}" -f $s.q) -ForegroundColor DarkGray
  $r = Read-Host '      ¿Darlo de alta ahora? (s/N)'
  if ($r -eq 's' -or $r -eq 'S') {
    npx wrangler pages secret put $s.n --project-name $proyecto
  } else {
    Aviso ("{0} sin configurar" -f $s.n)
  }
}

# ── 3. Variables de texto (no son secretos) ────────────────────
#  El IBAN, el titular y el BIC van impresos en cada factura: no
#  tiene sentido tratarlos como secretos. Se ponen en el panel,
#  como variables de texto normales.
Titulo 'Variables de texto — a mano en el panel'
Write-Host @'
   Pages -> pb -> Settings -> Variables y secretos -> Agregar (tipo: Texto)

     WISE_IBAN      tu IBAN en euros
     WISE_TITULAR   el titular, tal como debe figurar en la factura
     WISE_BIC       el BIC de la cuenta en euros
     SITE_URL       https://perito.barcelona     (opcional)
'@ -ForegroundColor DarkGray

# ── 4. Build ───────────────────────────────────────────────────
Titulo 'Construyendo'
npm run build
if ($LASTEXITCODE -ne 0) { throw 'El build ha fallado. No despliegues.' }
Ok 'build terminado'

# ── 5. Lo que queda, y que este script no puede hacer ──────────
Titulo 'Pendiente, a mano'
Write-Host @'
   1. BINDING MAL ESCRITO  <-- esto ya está roto ahora mismo
      Pages -> pb -> Settings -> Vinculaciones
      Dice   rum   y el código lee   env.RUM
      Los nombres distinguen mayúsculas: mientras ponga "rum",
      /api/rum descarta TODOS los beacons en silencio.
      Cámbialo a RUM (dataset rum_pb, igual que ahora).

   2. Despliega cuando el build te convenza.

   3. Sólo DESPUÉS del despliegue, da de alta el webhook en Wise:
      Wise -> Developer tools -> Webhooks
      URL     https://perito.barcelona/api/wise-webhook
      Evento  balances#update      (NO balances#credit: ése no
                                    trae la referencia del pago)

   4. Y antes de eso, la clave pública de Wise en el panel de
      Cloudflare como WISE_WEBHOOK_PUBLIC_KEY. Sin ella el
      endpoint devuelve 401 a todo, que es lo correcto: un
      endpoint de cobros no acepta POSTs sin firmar.
'@ -ForegroundColor Yellow
Write-Host ''
