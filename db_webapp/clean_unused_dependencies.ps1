# List of dependencies to remove
$dependenciesToRemove = @(
    "@rdkit/rdkit",
    "@vercel/postgres",
    "autoprefixer",
    "bootstrap",
    "canvas",
    "child_process",
    "dotenv",
    "flowbite",
    "flowbite-react",
    "lodash",
    "mongoose",
    "pandas",
    "postcss",
    "prop-types",
    "rdkit",
    "react-bootstrap",
    "react-grid-system",
    "react-paginate",
    "smiles-drawer",
    "tailwindcss"
)

# Remove dependencies from package.json
Write-Host "Removing dependencies from package.json"
$packageJson = Get-Content "package.json" | ConvertFrom-Json

foreach ($dependency in $dependenciesToRemove) {
    $packageJson.dependencies.Remove($dependency)
    $packageJson.devDependencies.Remove($dependency)
}

$packageJson | ConvertTo-Json | Set-Content "package.json"

# Remove dependencies from package-lock.json
Write-Host "Removing dependencies from package-lock.json"
$packageLock = Get-Content "package-lock.json" | ConvertFrom-Json

foreach ($dependency in $dependenciesToRemove) {
    $packageLock.dependencies.root.dependencies.Remove($dependency)
    $packageLock.dependencies.root.devDependencies.Remove($dependency)
}

$packageLock | ConvertTo-Json | Set-Content "package-lock.json"

Write-Host "Dependencies removed."
