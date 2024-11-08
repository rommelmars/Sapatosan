import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShoeList = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/shoes')
      .then(response => setShoes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>All Shoes</h1>
      <ul>
        {shoes.map(shoe => (
          <li key={shoe.id}>{shoe.name} - {shoe.category} - ${shoe.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoeList;
