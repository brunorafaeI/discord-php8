const OBJUser = {
  
  async register(formUserRegister) {
    
    if (formUserRegister && formUserRegister.checkValidity()) {
      const ObjForm = this.traitElement(formUserRegister)
      
      if (Object.values(ObjForm).length) {
        const response = await fetch('/users/add', { 
          method: 'POST',
          body: JSON.stringify(ObjForm)
        })
        
        if (response.ok) {
          const { message } = await response.json()
          
          if (message) { 
            alert(message)            
            return formUserRegister.reset()
          }
 
          location.href = '/dashboard';
        }
      }
    }
  },
  
  traitElement(elem) {
    let result = {}
    
    for (let i= 0; i < elem.length; i++) {
      if (elem[i].value) {
        result[elem[i].name] = elem[i].value
      }
    }
    
    return result
  }
}