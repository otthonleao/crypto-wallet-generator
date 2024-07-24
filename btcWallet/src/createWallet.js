const bip32 = require("bip32");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

/* DEFINIR A REDE */
const network = bitcoin.networks.testnet;

/* DERIVAÇÃO DE CARTEIRAS DETERMINÍSTICAS (HD)*/
const path = `m/49'/1'/0'/0`; // Para teste

/* GERAR MNEMONIIC */
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

/* GERAR RAIZ DA CARTEIRA DETERMINÍSTICA*/
let root = bip32.fromSeed(seed, network);

/* CRIANDO UMA CONTA */
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

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
console.log("PRIVATE KEY: ", node.toWIF());
console.log("SEED: " + mnemonic);
console.log(
  "===========================================================================================\n"
);
