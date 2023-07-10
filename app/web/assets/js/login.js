const OBJLogin = {
  
  async sendForm(formLogin) {
    
    if (formLogin && formLogin.checkValidity()) {
      const ObjForm = this.traitElement(formLogin)
      
      if (Object.values(ObjForm).length) {
        const response = await fetch('/login', { 
          method: 'POST',
          body: JSON.stringify(ObjForm)
        })
        
        if (response.ok) {
          const { message } = await response.json()
          
          if (message) { 
            alert(message)            
            return formLogin.reset()
          }
 
          location.href = '/';
        }
      }
    }
  },
  
  logout() {
    fetch('/logout')
      .then(() => location.href = '/')    
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