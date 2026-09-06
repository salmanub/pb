---
layout: layouts/legal.njk
title: "Política de Galetes (Cookies)"
description: "Política de galetes de Perito.Barcelona. Quines galetes s'instal·len, per què, amb quin consentiment i com retirar-lo en qualsevol moment."
lang: ca
seo: noindex
translations:
  - lang: es
    permalink: /cookies/
  - lang: en
    permalink: /en/cookies/
permalink: "/ca/cookies/"
hero:
  title: "Política de Galetes (Cookies)"
  subtitle: "Què es desa al seu navegador, amb quin permís i com retirar-lo."
  lastUpdated: "Última actualització: 6 de setembre de 2026 · Versió 1"
---

Aquesta política desenvolupa, pel que fa a l'emmagatzematge d'informació al terminal de l'usuari, el que preveuen l'article 22.2 de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSICE) i el Reglament (UE) 2016/679 (RGPD). Complementa la [Política de Privacitat](/ca/privacitat/), que regula el tractament de les dades personals facilitades a través d'aquest lloc web.

### 1. Què és una galeta

Una galeta (cookie) és un petit fitxer de text que un lloc web desa al seu navegador i que es retorna al servidor en cada petició posterior, cosa que permet reconèixer el navegador entre pàgines i entre visites. Al costat de les galetes hi ha altres mecanismes d'emmagatzematge al terminal, com ara l'emmagatzematge local del navegador, que es descriuen als apartats 4 i 5 d'aquesta política.

### 2. Galetes que utilitza aquest lloc web

Aquest lloc web només instal·la galetes d'analítica, corresponents a Google Analytics 4, i **únicament si vostè les accepta** a l'avís de consentiment. No s'utilitzen galetes de publicitat, de personalització ni de perfilació.

| Galeta | Proveïdor | Durada | Finalitat |
| --- | --- | --- | --- |
| `_ga` | Google LLC | 2 anys | Distingir usuaris (identificador de navegador assignat per Google Analytics). |
| `_ga_BHS8JR7NSY` | Google LLC | 2 anys | Mantenir l'estat de la sessió de Google Analytics. |

Totes dues es dipositen al domini `perito.barcelona` des de l'script de mesurament de Google, i no hi ha cap altra galeta declarada ni instal·lada per aquest lloc web. El sufix `BHS8JR7NSY` correspon a l'identificador del contenidor de mesurament de Google Analytics utilitzat en aquest lloc.

### 3. Què passa si vostè no accepta

Si no accepta, o si rebutja expressament, **no s'instal·la cap galeta**. El mesurament continua llavors en mode anònim i sense galetes: el lloc envia a Google mesuraments agregats de pàgines vistes, sense identificador persistent i sense possibilitat de vincular una visita amb una altra ni de reconèixer el seu navegador en visites posteriors. Aquest mesurament sense galetes transmet igualment a Google les dades tècniques pròpies de qualsevol petició web, entre elles l'adreça IP, que segons la documentació de Google s'utilitza per deduir una ubicació aproximada i no es registra a Google Analytics.

L'avís de consentiment no condiciona l'accés a cap contingut del lloc: rebutjar té exactament el mateix cost que acceptar.

### 4. On es desa la seva elecció

La seva decisió es desa a l'**emmagatzematge local** (`localStorage`) del seu navegador, sota la clau `pb_consent`, amb tres dades: la versió d'aquesta política, l'elecció adoptada (acceptada o rebutjada) i la data en què es va prendre.

L'emmagatzematge local és un espai del mateix navegador on un lloc web pot desar una dada al seu dispositiu. **No és una galeta**: a diferència d'aquestes, no s'envia al servidor en cada petició. El valor de `pb_consent` roman al seu navegador i no es transmet a `perito.barcelona`, a Google ni a cap tercer.

Se li tornarà a preguntar transcorreguts 12 mesos des de la seva elecció, o abans si canvia la versió d'aquesta política pel que fa a les galetes declarades.

### 5. Altra informació emmagatzemada al seu navegador

A més de l'elecció de consentiment, el lloc pot desar les dades següents a l'**emmagatzematge de sessió** (`sessionStorage`), que el navegador esborra en tancar la pestanya. Tampoc no són galetes ni s'envien al servidor per si mateixes.

| Clau | Durada | Finalitat |
| --- | --- | --- |
| `pb_utm` | Sessió de navegació | Conservar els paràmetres de campanya (`utm_source`, `utm_medium`, `utm_campaign`) presents a l'adreça d'entrada, perquè el mesurament atribueixi correctament la visita a l'origen pel qual va arribar. Només s'escriu si l'adreça d'entrada conté aquests paràmetres. |
| `pb_form` | Sessió de navegació | Recordar quin formulari s'ha enviat, únicament per poder registrar la confirmació d'enviament a la pàgina d'agraïment. Desa el nom intern del formulari, no el seu contingut. S'esborra en mostrar-se aquesta confirmació. |

Cap d'aquestes dues claus no conté dades identificatives ni el contingut dels formularis.

### 6. Mesurament tècnic anònim del rendiment

Amb independència de la seva elecció sobre les galetes, aquest lloc web recull un mesurament tècnic del rendiment de les pàgines basat en les mètriques Core Web Vitals: LCP, INP, CLS, FCP i TTFB. Al costat de cada mètrica es registra únicament la ruta de la pàgina, l'idioma, el tipus de lliurament del document, el tipus de connexió declarat pel navegador, si el dispositiu és mòbil i si la visita prové de la memòria cau de resultats de Google.

Aquest mesurament **no utilitza galetes, no accedeix a l'emmagatzematge del terminal i no fa servir cap identificador** que permeti reconèixer una persona o seguir-la entre pàgines. Les dades s'emmagatzemen de manera agregada a la infraestructura d'anàlisi de Cloudflare, proveïdor d'allotjament d'aquest lloc web, sense registrar l'adreça IP; aquesta s'utilitza de manera transitòria i en memòria únicament per limitar el nombre d'enviaments per minut i evitar abusos.

En no implicar emmagatzematge ni accés a informació al terminal, aquest mesurament queda fora de l'àmbit de l'article 22.2 de la LSSICE i no requereix consentiment. La base jurídica del tractament és l'**interès legítim** del responsable a conèixer i millorar el rendiment tècnic del seu lloc web (article 6.1.f del RGPD). Pot oposar-se a aquest tractament en els termes de l'apartat 6 de la Política de Privacitat.

### 7. Verificació anti-robots dels formularis

Els formularis de contacte incorporen el widget de verificació Cloudflare Turnstile, necessari per impedir enviaments automatitzats. És una mesura de seguretat imprescindible per prestar el servei sol·licitat per l'usuari. [PENDENT: confirmar a la documentació de Cloudflare si Turnstile emmagatzema o consulta informació al terminal en la configuració utilitzada i, si escau, declarar aquí la clau, la durada i la finalitat.]

### 8. Com retirar o canviar el seu consentiment

Al peu de pàgina de qualsevol pàgina d'aquest lloc web hi trobarà l'enllaç **«Cookies»**, que torna a obrir l'avís de consentiment perquè pugui canviar la seva decisió en qualsevol moment. Retirar el consentiment és tan senzill com prestar-lo i no té cap conseqüència sobre l'ús del lloc.

Si retira el consentiment, el lloc web deixa d'utilitzar les galetes analítiques. Les galetes `_ga` que s'haguessin instal·lat anteriorment **romanen al seu navegador** fins que caduquin o fins que vostè les elimini, encara que deixin d'utilitzar-se; a l'apartat següent s'explica com esborrar-les.

### 9. Com eliminar les galetes des del seu navegador

Tots els navegadors permeten veure, blocar i eliminar les galetes i la resta de dades que un lloc web hagi desat al dispositiu. L'opció es troba a la secció de privacitat de la configuració del navegador:

* **Google Chrome:** Configuració → Privadesa i seguretat.
* **Mozilla Firefox:** Paràmetres → Privadesa i seguretat.
* **Safari:** Configuració → Privadesa.
* **Microsoft Edge:** Configuració → Galetes i permisos del lloc.

Tingui en compte que l'opció d'esborrar «galetes i dades de llocs» elimina també l'emmagatzematge local, és a dir, la clau `pb_consent` on es desa la seva elecció. En tornar a visitar el lloc, l'avís de consentiment es mostrarà de nou.

El bloqueig total de galetes al navegador no impedeix l'ús d'aquest lloc web, que funciona amb normalitat sense cap d'elles.

### 10. Destinataris i transferències internacionals

Les galetes analítiques descrites a l'apartat 2, així com el mesurament sense galetes descrit a l'apartat 3, impliquen la comunicació de dades a Google com a proveïdor de l'eina Google Analytics, cosa que pot suposar una transferència internacional de dades a un país situat fora de l'Espai Econòmic Europeu. [PENDENT: confirmar l'entitat de Google que actua com a part contractant per a l'Espai Econòmic Europeu i el mecanisme de transferència aplicable —Marc de Privacitat de Dades UE-EUA o clàusules contractuals tipus— segons el contracte de tractament de dades subscrit amb Google.]

El mesurament tècnic de rendiment descrit a l'apartat 6 es tracta a la infraestructura del proveïdor d'allotjament del lloc web i no incorpora dades identificatives.

### 11. Canvis en aquesta política i versió aplicable

La versió vigent d'aquesta política és la **versió 1**, de 6 de setembre de 2026. L'avís de consentiment desa aquesta versió juntament amb la seva elecció: quan la política canviï pel que fa a les galetes declarades, la versió s'incrementarà i se li tornarà a sol·licitar el consentiment.

Per a qualsevol dubte relatiu a aquesta política pot adreçar-se a `info@perito.barcelona`.
