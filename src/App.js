import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`,
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest', // Required for some CORS proxies
          },
        }
      );
      const newPosts = response.data.nodes;
      if(newPosts.length>0)
      {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPage(page => page + 1);
        console.log('page', page);
        setIsLoading(false);
      }
     
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
      <h1 style={{textAlign:'center'}}>Infinite Scroll App</h1>
      <div style={{ minHeight: '800px', }}>
        {posts.map(post => (
          <div key={post.node.nid} style={{ padding: '20px', border: '1px solid #ccc', display: 'flex' }}>
            <div >
              <img width="200px" height="150px" style={{ borderRadius: '20%' }} src={post.node.ImageStyle_thumbnail}></img>
            </div>
            <div style={{ marginLeft: '10px' }}>
              <h2 style={{
                width: '70ch',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}>{post.node.title}</h2>
              <p style={{  color:'gray',fontSize:'18px'}}>{moment(post.node.last_update).format('MMMM Do YYYY, h:mm:ss a')} IST</p>
            </div>
          </div>
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
      <div style={{ backgroundColor:'lightgray', color: 'black' }} onMouseOver={fetchData}>Load more..</div>
      </div>
    </div>
  );
};

export default App;
