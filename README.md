### Setting Up

- Install `pnpm` from this link: https://pnpm.io/installation

### Install `nvm` (node version manager) and node v16 - Mac and Linux

- Download and install nvm:
  `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash `
- in lieu of restarting the shell
  `\. "$HOME/.nvm/nvm.sh"`
- Download and install Node.js:
  `nvm install 16`
- Verify the Node.js version:
  `node -v # Should print "v16.20.2".`
  `nvm current # Should print "v16.20.2".`
- Verify npm version:
  `npm -v # Should print "8.19.4".`

### Install `nvm` (node version manager) and node v16 - Windows

- Download and install fnm:
  `winget install Schniz.fnm`

- Download and install Node.js:
  `fnm install 16`

- set fnm envs
  `FOR /f "tokens=*" %%z IN ('fnm env --use-on-cd') DO CALL %%z`

- Verify the Node.js version:
  `node -v # Should print "v16.20.2".`

- Verify npm version:
  `npm -v # Should print "8.19.4".`

- Install pnpm
  `npm install -g pnpm@9.5.0`

### Clone the repository

```bash
git clone https://github.com/TylerMutai/land-leasing.git
```

### Install dependencies:

```bash
cd land-leasing
pnpm install
```

### Start the server:

```bash
pnpm start
```

### For old Windows (not using ARM chips):

#### CMD:

```bash
set NODE_OPTIONS=--openssl-legacy-provider
```

#### Windows Powershell:

```bash
$Env:NODE_OPTIONS='--openssl-legacy-provider'
```

#### Increase node heap size:

```bash
export NODE_OPTIONS='--max-old-space-size=8192'
```

### Set up open AI API Key
```bash
export OPENAI_API_KEY=
```


- Open your browser and navigate to http://localhost:3000
