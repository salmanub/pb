$repos = Invoke-RestMethod 'https://api.github.com/users/salmanub/repos?per_page=100'
foreach ($r in $repos) {
    if (-not $r.fork) {
        Write-Host "$($r.name) | $($r.description) | $($r.homepage)"
    }
}
