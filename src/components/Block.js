import {useState} from 'react';

export const Block = ()=>{
    const [value,setValue] = useState('8');
    const handleInput = (e)=>{
        setValue(e.target.value); 
    }
    var pasCoffre = [];
    const [criterias,setCrieterias] = useState([]);
    const [mdp,setMdp] = useState('');

    const lowChar = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const upChar = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const numbers = ['1','0','2','3','4','5','6','7','8','9'];
    const symbols = ['&','.','#','-','@'];
    var mdpArr = [];
    var mdpStr='';
    const handleCheck = (e)=>{
        if (criterias.includes(e.target.id)) {
            setCrieterias(criterias.filter((el)=>el!==e.target.id));
        }else{
            setCrieterias([...criterias,e.target.id]);
        }
        
    }
    const handleGen = (e)=>{
        for (let i = 0; i < criterias.length; i++) {
            const element = criterias[i];
            switch (element) {
                case 'up':
                    pasCoffre.push(...upChar);
                    break;
                case 'low':
                    pasCoffre.push(...lowChar);
                    break;
                case 'num':
                    pasCoffre.push(...numbers);
                    break;
                case 'sym':
                    pasCoffre.push(...symbols);
                    break;
            
                default:
                    break;
            }
        }
        

       if (value<8 || value>26) {
            alert('nope');
       } else {
        for (let i = 0; i < value; i++) {
            mdpArr.push(pasCoffre[Math.floor(Math.random()*pasCoffre.length)]);
            
        }
        for (let i = 0; i < mdpArr.length; i++) {
            if (mdpStr === '') {
                mdpStr = `${mdpArr[i]}`;
            } else {
                mdpStr = `${mdpStr}${mdpArr[i]}`;
            }         
        }
        if (mdpArr[5]) {
            setMdp(mdpStr);
        } else {
            setMdp('');
        }
        
       }
        console.log(mdpArr.length);
        pasCoffre=[];
    }
    const handleCopy = async ()=>{
        try {
            await navigator.clipboard.writeText(mdp);
            alert(`${mdp} copied !!!`);
        } catch (error) {
            alert('Copying to clipboard failed. Please select and copy the password manually.');
        }
        
    }
    return(
        <div id='wrapper'> 
            <h3>Password Generator</h3>
            <div id='output'>
                <div id='display'>
                    {mdp}
                </div>
                <button id='copy' onClick={handleCopy}>
                    &#169;
                </button>
            </div>
            <div className='child'>
                <label for='length'>Password Length</label>
                <input type='number' id='length' name='length' min='8' max='26' value={value} onChange={handleInput}></input>
            </div>
            <div className='child'>
                <label for='up'>Add Uppercase Letters</label>
                <input type='checkbox' id='up' name='up' onClick={handleCheck}></input>
            </div>
            <div className='child'>
                <label for='low'>Add Lowercase Letters</label>
                <input type='checkbox' id='low' name='low' onClick={handleCheck}></input>
            </div>
            <div className='child'>
                <label for='num'>Include Numbers</label>
                <input type='checkbox' id='num' name='num' onClick={handleCheck}></input>
            </div>
            <div className='child'>
                <label for='sym'>Include Symbols</label>
                <input type='checkbox' id='sym' name='sym' onClick={handleCheck}></input>
            </div>

            <button className='child' id='gen' onClick={handleGen}>Generate Password</button>
        </div>
    )
}