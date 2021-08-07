$(".addcertbtn").prop('disabled', true)
$(".Course__remove__btn").prop('disabled', true)
$(".addcoursebtn").prop('disabled', true)
var web3
var ownerAddress
var lay1con
var lay2con
var findByAddress
var accounts
var chainId
var isConnectToMetamask          
const lay1Address = "0x65c7B6d15F3883a08B9009690B9206AAf2b021c4"
const lay2Address = "0x8D325a1b27FeaFEE9E35B8EDd52A0f89743C80da"
const lay1Abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "orgId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "orgName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "orgContractAddress",
						"type": "address"
					}
				],
				"indexed": false,
				"internalType": "struct CertSystemLayer1.Organization",
				"name": "",
				"type": "tuple"
			}
		],
		"name": "Register",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allOrganizations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "orgId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "orgName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "orgContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "creator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_orgAddress",
				"type": "address"
			}
		],
		"name": "finalized",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "ipfsToProgramAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isOrgAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "maxProgramNumberOfOrg",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "maxTotalCertOfOrg",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "numberOfProgramHasPaid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "orgCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_orgName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_orglink",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_orgPic",
				"type": "string"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_ipfs",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_isAddFunc",
				"type": "bool"
			}
		],
		"name": "setIpfsToActAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_orgAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_maxProgram",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxCert",
				"type": "uint256"
			}
		],
		"name": "setLimit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const lay2Abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orgId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_orgName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_orglink",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_orgPic",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "programContractAddress",
						"type": "address"
					}
				],
				"indexed": false,
				"internalType": "struct OrganizationContract.Program",
				"name": "",
				"type": "tuple"
			}
		],
		"name": "AddProgram",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_programName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_programPic",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_link",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuedBy",
				"type": "string"
			}
		],
		"name": "addNewProgram",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allPrograms",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "programContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isProgramAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "layer1Contract",
		"outputs": [
			{
				"internalType": "contract CertSystemLayer1",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_isAddFunc",
				"type": "bool"
			}
		],
		"name": "modifyTotalCert",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "orgId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "orgLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "orgName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "orgPic",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "programCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "setNewOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalCertCount",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_orgName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_orglink",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_orgPic",
				"type": "string"
			}
		],
		"name": "updateInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const lay3Abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_programName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_programPic",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_link",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuedBy",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "certNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "issueTo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					}
				],
				"indexed": false,
				"internalType": "struct ProgramContract.Certificate",
				"name": "Newcert",
				"type": "tuple"
			}
		],
		"name": "AddCertificate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "certNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "issueTo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					}
				],
				"indexed": false,
				"internalType": "struct ProgramContract.Certificate",
				"name": "Removecert",
				"type": "tuple"
			}
		],
		"name": "RemoveCertificate",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_issueTo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "addNewCerificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allCertId",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "certificateById",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "certNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "issueTo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "date",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "issuedBy",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "layer2Contract",
		"outputs": [
			{
				"internalType": "contract OrganizationContract",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "link",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "programName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "programPic",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			}
		],
		"name": "removeCertById",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "setNewOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalAddedCert",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_programName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_programPic",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_link",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuedBy",
				"type": "string"
			}
		],
		"name": "updateInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

window.addEventListener('load', async() => {
	await ethereum._metamask.isUnlocked().then(async(value) => {
		console.log(value)
		isConnectToMetamask = value
		if(value) {
			console.log("You have Metamask")
			accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			//chainId = await ethereum.request({ method: 'eth_chainId' });
			await ethereum.request({ method: 'eth_chainId' }).then(_chainId => {
				chainId = _chainId;
				if(_chainId == "0x38"){
					web3 = new Web3(window.ethereum);
					startApp()
					return true;
				} else {
					ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [{ "chainId": "0x38", "chainName": "BSC Mainnet", "rpcUrls": ["https://bsc-dataseed.binance.org/"], "nativeCurrency": { "name": "Binance Coin", "symbol": "BNB", "decimals": 18 } }]
					})
					web3 = new Web3("https://bsc-dataseed.binance.org/")
					startApp()
					return true;
				}
			})
		} else {
			console.log("pls install metamask")
    		web3 = new Web3("https://bsc-dataseed.binance.org/")
			startApp()
			return false;
		}
	})
})

function startApp() {
	lay1con = new web3.eth.Contract(lay1Abi, lay1Address)
	lay2con = new web3.eth.Contract(lay2Abi, lay2Address)

	lay2con.methods.owner().call((err, _owner) => {
		ownerAddress = _owner
		$("#ownerAddress").html("Owner Address: "+_owner)
		if(isConnectToMetamask) {
			if(accounts[0].toLowerCase() != ownerAddress.toLowerCase()) {
				$(".connect__button__btn").html("Wrong Account")
			} else if(chainId != "0x38"){
				$(".connect__button__btn").html("Wrong Chain")
			} else {
				$(".connect__button__btn").html("Ready")
				$(".connect__button__btn").css('background-color','rgb(132, 255, 116)')
				$(".connect__button__btn").css('color','black')
				$(".addcertbtn").html("Add")
				$(".Course__remove__btn").html("Remove")
				$(".addcoursebtn").html("Add")
				$(".addcertbtn").prop('disabled', false)
				$(".Course__remove__btn").prop('disabled', false)
				$(".addcoursebtn").prop('disabled', false)
				$(".connect__button__btn").prop('disabled', true)
			}
		}
	})
	$(".course").remove()
	lay2con.methods.programCount().call((err, prgcount) => {
		add(prgcount)
		for(let i = 0; i < prgcount; i++) {
			lay2con.methods.allPrograms(i).call((err,program) => {
				const lay3con = new web3.eth.Contract(lay3Abi, program.programContractAddress)
				$("#id"+String(i)).html("Id: " + i)
				lay3con.methods.date().call((err, _date) => {
					$("#date"+String(i)).html("Date: "+_date)
				})
				lay3con.methods.programName().call((err, _name) => {
					$("#name"+String(i)).html(_name)
				})
				lay3con.methods.link().call((err, _link) => {
					$("#info"+String(i)).html(_link)
				})
				lay3con.methods.programPic().call((err, _pic) => {
					$("#image"+String(i)).attr("src", "https://gateway.pinata.cloud/ipfs/"+_pic)
				})
				lay3con.methods.issuedBy().call((err, _issued) => {
					$("#issued"+String(i)).html("Issued By: " + _issued)
				})
			})
		}
	})
}

$(".connect__button__btn").click(async() => {
	accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	await ethereum.request({ method: 'eth_chainId' }).then(_chainId => {
		isConnectToMetamask = true;
		chainId = _chainId;
		if(_chainId == "0x38"){
			web3 = new Web3(window.ethereum);
			startApp()
			return true;
		} else {
			ethereum.request({
				method: 'wallet_addEthereumChain',
				params: [{ "chainId": "0x38", "chainName": "BSC mainnet", "rpcUrls": ["https://bsc-dataseed.binance.org/"], "nativeCurrency": { "name": "Binance Coin", "symbol": "BNB", "decimals": 18 } }]
			})
			web3 = new Web3("https://bsc-dataseed.binance.org/")
			startApp()
			return true;
		}
	})
})
window.ethereum.on('disconnect', function() {
	window.location.reload()
});
window.ethereum.on('chainChanged', function(_chainId) {
	window.location.reload()
});

window.ethereum.on('accountsChanged', function (newAcc) {
	accounts = newAcc
	if(newAcc[0].toLowerCase() === ownerAddress.toLowerCase()) {
		if(chainId == "0x38"){
			$(".connect__button__btn").html("Ready")
			$(".connect__button__btn").css('background-color','rgb(132, 255, 116)')
			$(".connect__button__btn").css('color','black')
			$(".addcertbtn").html("Add")
			$(".Course__remove__btn").html("Remove")
			$(".addcoursebtn").html("Add")
			$(".addcertbtn").prop('disabled', false)
			$(".Course__remove__btn").prop('disabled', false)
			$(".addcoursebtn").prop('disabled', false)
		} else {
			$(".connect__button__btn").html("Wrong Chain")
			$(".connect__button__btn").css('background-color','rgb(194, 81, 194)') 
			$(".connect__button__btn").css('color','white') 
			$(".addcertbtn").html("Connect")
			$(".Course__remove__btn").html("Connect")
			$(".addcoursebtn").html("Connect")
			$(".addcertbtn").prop('disabled', true)
			$(".Course__remove__btn").prop('disabled', true)
			$(".addcoursebtn").prop('disabled', true)
		}
	} else {
		$(".connect__button__btn").html("Wrong Account")
		$(".connect__button__btn").css('background-color','rgb(194, 81, 194)') 
		$(".connect__button__btn").css('color','white') 
		$(".addcertbtn").html("Connect")
		$(".Course__remove__btn").html("Connect")
		$(".addcoursebtn").html("Connect")
		$(".addcertbtn").prop('disabled', true)
		$(".Course__remove__btn").prop('disabled', true)
		$(".addcoursebtn").prop('disabled', true)
	}
})

var file;
var inpFile = document.getElementById("myFile");

function admin_addcourse(){
	var cname = $("#Course__name").val()
	var clink = $("#Course__link").val()
	var cissued = $("#Course__issued").val()
	var cdate = $("#Course__date").val()
	file = inpFile.files[0]
	if(cname == "" || clink == "" || cdate == "" || cissued == ""){
		alert("Please type name,link, date and issuedBy")
	} else if(file == undefined) {
		alert("Please chose an image")
	} else {
		$(".addcoursebtn").prop('disabled', true)
		$("#loadaddcourse").html("Adding new course, pls wait...")
		let data = new FormData();
        data.append('file', file);
		axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, data, {
                    maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                        pinata_api_key: "fe8a1f46de05dcc4ad7e",
                        pinata_secret_api_key: "3ae4d4e22fa0121975850eb3234a9e212e532e6d5e6e8ff544fa371e33af3fd2"
                    }
                })
            .then(function (response) {
                
                console.log(response.data.IpfsHash);
				if (confirm("Bạn có chắc muốn thêm khóa học với \nName: "+cname+"\nLink: "+clink+"\nDate: "+cdate+"\nIssued By: "+cissued)) {
					lay2con.methods.addNewProgram(cname, response.data.IpfsHash, clink, cdate, cissued).send({from: accounts[0]})
					.on('receipt', function(receipt){
						// receipt example
						console.log(receipt);
						alert("Successfully adding new course")
						$(".addcoursebtn").prop('disabled', false)
						$("#loadaddcourse").html("")
						startApp()
					})
					.on('error', function(er){
						console.log(er);
						alert("Can't add new Course")
						$(".addcoursebtn").prop('disabled', false)
						$("#loadaddcourse").html("")
					})
					.catch(function (e) {
						console.log("Transaction Rejected")
						$(".addcoursebtn").prop('disabled', false)
						$("#loadaddcourse").html("")
					});
				} else {
					$(".addcoursebtn").prop('disabled', false)
					$("#loadaddcourse").html("")
				}
            })
            .catch(function (error) {
                alert("Something is wrong I guess")
            });
	}
}
var file2
var inpFile2 = document.getElementById("certiimg");
function addcert(){
	var nname = $("#addname").val()
	var nid = SHA1($("#addid").val())
	file2 = inpFile2.files[0]
	if(nname == "" || nid == ""){
		alert("Please type name and id")
	} else if(file2 == undefined) {
		alert("Please chose an image")
	} else {
		$(".addcertbtn").prop('disabled', true)
		$("#loadaddcert").html("Adding new Certificate, please wait...")
		let data = new FormData();
        data.append('file', file2);
		if (confirm("Bạn có chắc muốn thêm Certìicate với \nName: "+nname+"\nId: "+nid)) {
			axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, data, {
        	            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        	            headers: {
        	                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        	                pinata_api_key: "fe8a1f46de05dcc4ad7e",
        	                pinata_secret_api_key: "3ae4d4e22fa0121975850eb3234a9e212e532e6d5e6e8ff544fa371e33af3fd2"
        	            }
        	        })
        	    .then(function (response) {
        	        console.log(response.data.IpfsHash);
					let lay3con = new web3.eth.Contract(lay3Abi, findByAddress)
					lay3con.methods.addNewCerificate(nname, nid, response.data.IpfsHash).send({from: accounts[0]})
					.on('receipt', function(receipt){
						// receipt example
						console.log(receipt);
						$(".addcertbtn").prop('disabled', false)
						$("#loadaddcert").html("")
					})
					.on('error', function(er){
						console.log(er);
						alert("Can't add new Course")
						$(".addcertbtn").prop('disabled', false)
						$("#loadaddcert").html("")
					})
					.catch(function (e) {
						console.log("Transaction Rejected")
						$(".addcertbtn").prop('disabled', false)
						$("#loadaddcert").html("")
					})
        	    })
        	    .catch(function (error) {
        	        alert("Something is wrong I guess")
        	    });
		}
	}
}
	
function remove() {
	var removeId = SHA1($("#course__remove__inp").val())
	let lay3con = new web3.eth.Contract(lay3Abi, findByAddress)
	lay3con.methods.certificateById(removeId).call((err, cert) => {
		if(cert.issueTo == "") {
			alert("Id not found")
		} else {
			if(confirm("Do you want to remove certificate with id: "+$("#course__remove__inp").val())) {
				$(".Course__remove__btn").prop('disabled', true)
				$("#loadremovecert").html("Removing Certificate with Id "+$("#course__remove__inp").val()+", please wait")
				lay3con.methods.removeCertById(removeId).send({from: accounts[0]})
				.on('receipt', function(receipt){
					console.log(receipt);
					alert("Successfully remove Certificate with Id "+$("#course__remove__inp").val())
					$(".Course__remove__btn").prop('disabled', false)
					$("#loadremovecert").html("")
				})
				.on('error', function(er){
					console.log(er);
					alert("Can't remove certificate")
					$(".Course__remove__btn").prop('disabled', false)
					$("#loadremovecert").html("")
				})
				.catch(function (e) {
					console.log("Transaction Rejected")
					$(".Course__remove__btn").prop('disabled', false)
					$("#loadremovecert").html("")
				});
			}
		}
	})
}

$(".FindCourseBtn").click(function(){
	var finId = Number($("#FindCourse").val())
	lay2con.methods.programCount().call((err, prgcount) => {
		if(!Number.isInteger(finId) || finId < 0){
			alert("Id must be an non negative integer")
		} else if(finId >= prgcount) {
			alert("Id must be smaller than " + prgcount)
		} else {
			$(".course").remove()
			const course = document.createElement('div')
			  course.classList.add('course')
			  course.innerHTML =
			  `<div class="course__image">
				<img id="image${finId}" src="" alt="course image preview">
			  </div>
			  <div class="courseinfo">
				<h2 id="name${finId}" class="courseinfo__name"></h2>
				  <p id="id${finId}" class="courseinfo__id">Course Id: }</p>
				  <p id="date${finId}" class="courseinfo__date">Date: </p>
				  <p id="issued${finId}" class="courseinfo__issued">Issued by: Vietnam Institute for Advanced Study in Mathematics (VIASM)</p>
				  <p class="courseinfo__info">Course Information: <a id="info${finId}" href=""></a></p>
			  </div>
			  <div class="course__button">
				<button onclick="gotoProgram(${finId})" class="gotocert">Add</button>
			  </div>`
			$("#courses").append(course)
		
			lay2con.methods.allPrograms(finId).call((err,program) => {
				const lay3con = new web3.eth.Contract(lay3Abi, program.programContractAddress)
				$("#id"+String(finId)).html("Id: " + finId)
				lay3con.methods.date().call((err, _date) => {
					$("#date"+String(finId)).html("Date: "+_date)
				})
				lay3con.methods.programName().call((err, _name) => {
					$("#name"+String(finId)).html(_name)
				})
				lay3con.methods.link().call((err, _link) => {
					$("#info"+String(finId)).html(_link)
				})
				lay3con.methods.programPic().call((err, _pic) => {
					$("#image"+String(finId)).attr("src", "https://gateway.pinata.cloud/ipfs/"+_pic)
				})
				lay3con.methods.issuedBy().call((err, _issued) => {
					$("#issued"+String(finId)).html("Issued By: " + _issued)
				})
			})
		}
	})
})