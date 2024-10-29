


export const secret = async () =>{
    let secret ='';
    for( let i=0;i < 6; i++){
        secret += Math.round(Math.random()*10);

    }
    return secret;
}

