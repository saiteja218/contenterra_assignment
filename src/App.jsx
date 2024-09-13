import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';


import axios from "axios"

const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const HtmlContent = ({ content }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: decodeHtml(content) }}></div>
  );
};

function App() {
  const [data, setData] = useState([])


  useEffect(()=>{
    async function getallData(){
      await axios.get('https://www.reddit.com/r/reactjs.json').then(res=>{
        setData(res.data.data.children)
      })
    }
    getallData();
  },[])

  return (
    <div>
      <Grid container>
      {
        data.map((item,index)=>{
        return(
          <Grid item xs={12}>
            <Card key={index} sx={{maxWidth:'100%', gap:"2rem", border:'2px solid grey', borderRadius:'2rem', padding:'1rem', margin:'1rem', justifySelf:"center"}}>
              <CardActionArea>
              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  {item.data.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}></Typography>
                <HtmlContent style={{marginLeft:"2rem"}} content={item.data.selftext_html} />
                <a href={`${item.data.url}`}>{item.data.url}</a>
                <Typography variant='h6' sx={{marginTop:'2rem'}}>Score: {item.data.score}</Typography>
              </CardContent>
              </CardActionArea>
            </Card>
            
          </Grid>
      )
    })
  }

</Grid>

    </div>

    
  )
}

export default App