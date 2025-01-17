import { StyleSheet, View, Text,Button , TextInput, Image ,Pressable, ScrollView } from 'react-native';
import { useForm, Controller } from "react-hook-form"
import YupPassword from 'yup-password'
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from "yup";
import axios from 'axios';


YupPassword(yup)



 function Signin({navigation}:any) {



const schema = yup.object().shape({
  Email:yup.string().email("invalid email format").required("this field is required"),
  Password:yup.string().required("this field is required")
})


  type FormData = {
    Email: string
    Password: string
  }

  
  interface inputs {
    Email: String ;
    Password : String ;
  }


  const {
    control,
    handleSubmit,
    formState: { errors },
   
  } = useForm<FormData>({
    resolver:yupResolver(schema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  })
  const onSubmit = async (inputs:inputs) => {
    console.log(inputs)
  try {
    const {data} = await axios.post("http://192.168.1.21:3000/api/patients/signin",{
      email:inputs.Email ,
      password:inputs.Password
    })
    console.log("❤️❤️",data)
    await AsyncStorage.setItem('id', JSON.stringify(data.loggedUser.id));
    
    navigation.navigate("Patient")
  } catch (error) {
    console.log(error)
  }
  }
  }

  return (
    <View style={styles.maincontainer}>
      <View >
      <View >
        <Image
        style={styles.logo}
        source={require("../assets/image/logo.png")}
        />
        <Text style={styles.name}>CareClick</Text>
        </View>


        <View >
        <Text style={styles.title} >Sign in to your account </Text>
        </View>
        <Text style={styles.Email}>Email</Text>
      <Controller
        control={control}
        rules={{
          required: {value:true, message :"email is required" } , 
        
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="Email"
      />
      {errors.Email && <Text>{errors.Email.message}</Text>}
      
      <View style={styles.passwordcontainer} >
      <Text style={styles.password}>
          Password
         </Text>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            secureTextEntry={true}
          />
        )}
        name="Password"
      />
        {errors.Password && <Text style={styles.errorpassword} >{errors.Password.message}</Text>}
</View>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
       
        <View style ={styles.position} >
      <Text style={styles.account}>
        Don't have an accout ?  <Pressable  onPress={()=>{navigation.navigate("Signup")}}   ><Text style={styles.navigation}>sign up</Text></Pressable>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            secureTextEntry={true}
          />
        )}
        name="Password"
      />
        {errors.Password && <Text style={styles.errorpassword} >{errors.Password.message}</Text>}
</View>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
       
        <View style ={styles.position} >
      <Text style={styles.account}>
        Don't have an accout ?  <Pressable  onPress={()=>{navigation.navigate("Signup")}}   ><Text style={styles.navigation}>sign up</Text></Pressable>
       </Text>
       </View>
    </View>
  )
}
export default Signin

const styles = StyleSheet.create({
  logo: {
   width : 150,
   height : 200 ,
   marginLeft : 130,
   marginTop : -30
  },
  title : {
    marginLeft : 50,
    marginTop: -40,
    fontSize : 25,
  },
  Email : {
    color : "grey",
    marginRight : 240 ,
    marginTop : 30
    marginTop : 30
  
  },
  name: {
    marginLeft : 80,
    marginTop : -80,
    color : "#F26268" , 
    fontSize : 20,
    paddingBottom : 60
  } , 
  input : {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
     borderRadius : 20 , 
     width : 300 , 
    color : "black" ,
     
    color : "black" ,
     
    
  },
  container : {
marginTop : 30
  } , 
container1 : {
  marginTop : 50
    },

 navigation : {
  color : "#1DBED3",
  fontSize : 15,
 } ,

 position : {
  marginTop : 50,
  marginTop : 50,
  marginLeft : 20
 },

 account : {
   color : "#888888",
   fontSize : 15,
 },

 password : {
 
  marginLeft : 15 ,
 
  marginLeft : 15 ,
  color : "grey" ,
 },

 maincontainer:{
flex : 1 , 
justifyContent : "center",
alignItems:"center",
marginTop : 10

 },button: {
  marginTop: 15,
  marginLeft: 10,
  height: 50,
  width: 200,
  backgroundColor: '#F26268',
  borderRadius: 10,
  elevation: 3, // for Android
},
buttonText: {
  marginTop: 18,
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: 16,
  textAlign: 'center',
},

passwordcontainer :{
marginTop : 20
},
 
errorpassword : {
  marginLeft : 60
}
    
  });