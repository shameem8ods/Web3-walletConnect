import { Button, Box, Text,  FormControl,
  FormLabel,
  Input,} from "@chakra-ui/react";
import { useEthers,useToken, useTokenBalance} from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { useState } from "react";


export default function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  const [address, setAdress] = useState("")
  const [tokenName, setTokenName] = useState<any>("")
  const [amount, setAmount] = useState("")

  const token:any = useToken(address)
  const tokenbalance:any = useTokenBalance(address, account) 
  

  function handleConnectWallet() {
    activateBrowserWallet();
  }
  const handleInput = (event:any) =>{
    setAdress(event.target.value)
  }
  const handleSubmit = () =>{
    setTokenName(token)
    setAmount(tokenbalance) 
    setAdress("") 
  }
  return account ? (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      background="gray.700"
      borderRadius="lg"
      py="0"
      padding="20px"
    >
      <Button
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account}
        </Text>
      </Button>
      <Text color="white" fontSize="md" fontWeight="medium" mr="2">
        {
        amount&&tokenName?
          <Box display="flex"justifyContent="center"alignItems="center"mt="3">{tokenName?.symbol}:<Box bg='blue' borderRadius="lg" px={3}  color='white'>{amount && parseFloat(formatEther(amount)).toFixed(3)}</Box> </Box>
          :""
        }
        </Text>
      <FormControl>
        <FormLabel htmlFor='input' color="white" marginTop="20px" fontSize="14" mb="2px">Enter Token Adress</FormLabel>
        <Input id='email' type='input'  borderRadius="xl" onChange={handleInput} value={address} color="white" backgroundColor= "gray.700"/>
        <Button colorScheme='green' mt="15px" fontSize="15" onClick={handleSubmit}>Get Balance</Button>
      </FormControl>
    </Box>
  ) : (
    <Button onClick={handleConnectWallet}>Connect to a wallet</Button>
    
  );
}