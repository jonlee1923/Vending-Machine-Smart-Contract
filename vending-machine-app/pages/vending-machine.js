import 'bulma/css/bulma.css'
import styles from '../styles/VendingMachine.module.css'
import Head from 'next/head'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import vendingMachineContract from '../blockchain/vending'


const VendingMachine = () => {
    const [error, setError] = useState('') //created a new state called error using useState
    const [inventory, setInventory] = useState('') //state used to output balance value
    const [myDonutCount, setMyDonutCount] = useState('')//state for personal donut balance
    const [buyCount, setBuyCount] = useState('') //state variable for the number of donuts to buy
    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState(null)
    const [vmContract, setVmContract] = useState(null)
    const [successMsg, setSuccessMsg] = useState('')

    //runs as soon the page loads
    useEffect(() => {
        if (vmContract) getInventoryHandler()
        if (vmContract && address) getMyDonutCountHandler()
    },[vmContract, address]) //run only when these variables on the left change

    const getInventoryHandler = async () => {
        //instance of smart contract
        const inventory = await vmContract.methods.getVendingMachineBalance().call()
        setInventory(inventory)
    }

    //wont use useEffect as the accounts wont be available when the page loads 
    const getMyDonutCountHandler = async () => {
        //call function to the smart contract
        const count = await vmContract.methods.donutBalances(address).call()
        setMyDonutCount(count)
    }

    const updateDonutQty = event => {
        setBuyCount(event.target.value)
    }

    const buyDonutHandler = async () => {
        try{
            await vmContract.methods.purchase(buyCount).send({
                from: address,
                value: web3.utils.toWei('2', 'ether') * buyCount,
            })
            setSuccessMsg('${buyCount} donuts purchased!')

            if (vmContract) getInventoryHandler()
            if (vmContract && address) getMyDonutCountHandler()

        }catch(err){
            setError(err.message)
        }
        
    }

    const connectWalletHandler = async () => {
        //check if metamask is available
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                //request wallet connect
                await window.ethereum.request({ method: "eth_requestAccounts" })
                //create web3 instance
                web3 = new Web3(window.ethereum)
                //set state variable
                setWeb3(web3)
                //get list of accounts connected to wallet
                //retrieves an array of accounts available on my metamask
                const accounts = await web3.eth.getAccounts()
                setAddress(accounts[0])

                //create local contract copy
                const vm = vendingMachineContract(web3)
                setVmContract(vm)


            } catch (err) {

                setError(err.message)//set the error to the error message
            }
        }
        else {
            //metamask not installed
            console.log("Please install metamask")
        }
    }
    return <div className={styles.main}>
        <Head>
            <title>Vending Machine App</title>
            <meta name="description" content="A blockchain vending app" />
        </Head>

        {/* margin for top is mt, margin for bottom is mb */}
        <nav className="navbar mt-4 mb-4">
            <div className="container">
                <div className="navbar-brand">
                    <h1>Blockchain Vending Machine</h1>
                </div>

                <div className="navbar-end">
                    <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
                </div>
            </div>
        </nav>
        <section>
            <div className="container">
                <p>Vending machine inventory: {inventory}</p>
            </div>
        </section>
        <section>
            <div className="container">
                <h2>My donuts: {myDonutCount}</h2>
            </div>
        </section>
        <section className="mt-5">
            <div className="container">
                <div className="field">
                    <label className="label">Buy donuts</label>
                    <div className="control">
                        <input onChange={updateDonutQty} className="input" type="text" placeholder="Enter amount..." />
                    </div>
                    <button onClick={buyDonutHandler} className="button is-primary mt-2">
                        Buy
                    </button>

                </div>
            </div>
        </section>
        <section>
            <div className="container has-text-danger">
                <p>{error}</p>
            </div>
        </section>
        <section>
            <div className="container has-text-success">
                <p>{successMsg}</p>
            </div>
        </section>
    </div>
}

export default VendingMachine