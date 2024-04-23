import {useEffect} from "react"
import {useCookies} from "react-cookie"
import base64 from "base-64"
const UserProfile = ({config})=>{
	const [cookies, setCookie, removeCookie] = useCookies(['uid','requestToken']);
	const main=()=>{
		console.log(cookies)
		console.log(config)
	}
	useEffect(()=>{
		main()
	},[])
	return <>
		<h2>User Profile</h2>
		{
			cookies.uid ? <>

			</>:<>
			<a href="#/account/login">Login</a>
			</>
		}
	</>
}

export default UserProfile