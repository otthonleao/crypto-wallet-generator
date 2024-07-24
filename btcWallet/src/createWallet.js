const bip32 = require("bip32");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

/* DEFINIR A REDE */
const network = bitcoin.networks.testnet; // Rede de teste
//const network = bitcoin.networks.bitcoin // Rede principal (mainnet) em ambiente real

/* DERIVAÇÃO DE CARTEIRAS DETERMINÍSTICAS (HD)*/
const path = `m/49'/1'/0'/0`; // Para teste
// const path = `m/49'/0'/0'/0` // Para mainnet

/* Gerar um mnemonico (um conjunto de palavras aleatórias que forma a seed - palavras de senha) */
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

/* GERAR RAIZ DA CARTEIRA DETERMINÍSTICA*/
let root = bip32.fromSeed(seed, network);

/* CRIANDO UMA CONTA - par de chaves privadas (pvt) e chaves públicas (pub) */
let account = root.derivePath(path);
let node = account.derive(0).derive(0); // Conta Nó que vai sendo gerado a partir da raiz

/* CRIANDO ENDEREÇO */
let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address;

/* SYSOUT */
console.log(
  "\n=================================     CARTEIRA GERADA     ================================="
);
console.log("ENDEREÇO: " + btcAddress);
console.log("PRIVATE KEY: ", node.toWIF()); // Wallet Import Format - Importa a PK para que seja utilizada em um software de gerenciamento de carteiras, nesse caso vamos utilizar o Electrum
console.log("SEED: " + mnemonic);
console.log(
  "===========================================================================================\n"
);
