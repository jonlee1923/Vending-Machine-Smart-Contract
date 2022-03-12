// import Web3 from 'web3'

// //http provider to know which blockchain to target
// const provider = new Web3.providers.HttpProvider(
//     "https://rinkeby.infura.io/v3/0790d2aa464c441f9f1cd36b7203713d"
// )

// const web3 = new Web3(provider)

//variable for abi
const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "donutBalances", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getVendingMachineBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "purchase", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "restock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const vendingMachineContract = web3 => {
    return new web3.eth.Contract(abi, "0x771398dED354499d5c6219c0947FEF489e823487")
}


//local copy of smart contract, param: abi key and contract address
// const vmContract = new web3.eth.Contract(abi, "0x771398dED354499d5c6219c0947FEF489e823487")

//export vmContract
export default vendingMachineContract