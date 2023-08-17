import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import MyContract from './build/SightseeingToken2.json';
import classes from './MyPage.css';


const web3 = new Web3(window.ethereum);
const contractABI = MyContract.abi;
const networkId = await web3.eth.net.getId();
const contractAddress = '0x14FA9A316eD4Aa2EBcECd432C422a67B12EC9124';
const instance = new web3.eth.Contract(contractABI, contractAddress);


function MyPage ({account}) {
    const [address, setAddress] = useState('0x8FE051AFE0Ad1B8168CAB2F4832E1337dbd84d82');
    const [token, setToken] = useState('');
    const [ETH, setEth] = useState('');
    //const [add, setAdd] = useState(address)

    useEffect(() => {
        async function checkbalance() {
            const balance = await setAddress(address);
            instance.methods.balanceOf(address).call().then((resolve) =>{
                setToken(JSON.parse(resolve));
                  });
        }
        checkbalance();
        console.log(account);
    }, [account]);
    useEffect(() => {
        web3.eth.getBalance(address).then((resolve) =>{
           const balanceEth = web3.utils.fromWei(resolve, 'ether');
           setEth(balanceEth);
        });
    }, [account]);
   
  return (
    <body>
         <div class="container">
         <h1>My page</h1>
         <div>
             <p class="p1">Current Account: {address}</p>
             <p class="p3">手持ちトークン:{token}</p>
             <p class="p4">手持ちETH:{ETH}</p>
         </div>
         <div>
             <Link to="/eventregister">
                 <button className='botton2'>イベント登録ページ</button>
             </Link>
             <Link to="/eventhistory">
                 <button>イベント履歴</button>
             </Link>
             <Link to="/goodsregister">
                 <button>景品登録</button>
             </Link>
             <Link to="/buy">
                 <button>トークン購入</button>
             </Link>
         </div>
     </div>
    </body>
  );
};

export default MyPage;