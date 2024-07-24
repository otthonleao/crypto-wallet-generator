# Wallet Generator

Nesta parte do repositório é desenvolvido um gerador carteira de criptomoedas para transações em blockchain com bitcoin.
Com a execução no terminal do `$ node ./createWallet.js` são gerados Chaves Privadas e Publicas para realizar e verificar as transações.

### Steps

-[] Desenvolver o gerador de carteiras de bitcoin - `createWallet.js`;

-[] Importar para um software gerenciador de carteiras - [Electrum Bitcoin Wallet](https://electrum.org/);

-[] Explorar o bloco colocando o endereço da chave pública no buscador do [Blockchain.com](https://www.blockchain.com/pt/explorer) > explorer;

-[] Realizar transações de envio e recebimento de bitcoin utilizando o [Bitcoin Testnet Faucet Generator](https://bitcoinfaucet.uo1.net/).

# Development Step by Step

1. Adicione um arquivo `package.json`
   ```
   npm init
   ```
2. Instale as bibliotecas necessarias
   ```
   npm install bip39 bip32@2.0.6 bitcoinjs-lib —save
   ```
3. Crie um diretório source na raiz do projeto com o arquivo js: `btcwallet > src > createWallet.js`

   - Nesse arquivo criamos o nosso gerador de carteira importando as dependências

   ```js
   const bip32 = require("bip32");
   const bip39 = require("bip39");
   const bitcoin = require("bitcoinjs-lib");
   ```

   - Definir a rede de teste

     Para utilizar a rede principal (mainnet) em ambiente real use `bitcoin.networks.bitcoin`

   ```js
   const network = bitcoin.networks.testnet;
   ```

   - Derivação de carteiras HD

     Para utilizar a mainnet em ambiente real use `m/49'/0'/0'/0`

   ```js
   const path = `m/49'/1'/0'/0`;
   ```

   - Gerar um mnemonico (um conjunto de palavras aleatórias que forma a _seed - palavras de senha_)

   ```js
   let mnemonic = bip39.generateMnemonic();
   const seed = bip39.mnemonicToSeedSync(mnemonic);
   ```

   - Gerar a raiz da carteira determinística (HD)

   ```js
   let root = bip32.fromSeed(seed, network);
   ```

   - Criando uma conta - par de chaves privadas (pvt) e chaves públicas (pub)

   ```js
   let account = root.derivePath(path);
   let node = account.derive(0).derive(0); // Conta Nó que vai sendo gerado a partir da raiz
   ```

   - Criando endereço

   ```js
   let btcAddress = bitcoin.payments.p2pkh({
     pubkey: node.publicKey,
     network: network,
   }).address;
   ```

   - Saida no Terminal

   ```js
   console.log("CARTEIRA GERADA");
   console.log("ENDEREÇO: " + btcAddress);
   console.log("PRIVATE KEY: ", node.toWIF()); // Wallet Import Format - Importa a PK para que seja utilizada em um software de gerenciamento de carteiras, nesse caso vamos utilizar o Electrum
   console.log("SEED: " + mnemonic);
   ```

4. Gerar a carteira no terminal dentro do diretório que foi criado o `createWallet.js`

   ```bash
   $ node ./createWallet.js
   ```

5. Importar a chave privada gerada para dentro de um software gerenciador de carteira ([Electrum Bitcoin Wallet](https://electrum.org/))
