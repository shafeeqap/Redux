import React, { useCallback, useState } from "react";
import {produce} from 'immer'

const initialState = [
  {
    name: "house",
    rooms: [
      {
        name: "room1",
        text: "Room1",
      },
    ],
  },
  {
    name: "car",
    text: "i20",
  },
];

function RoomName(props) {
  console.log('RoomName');
    const {data, onChange}=props
  return (
    <div>
      <div>Update Room Name</div>
      <input type="text" value={data.text} onChange={onChange}/>
    </div>
  );
}

const CarName = React.memo((props)=>{
console.log('CarNme');
    const {data, onChange}=props
  return (
    <div>
      <div>Update Car Name</div>
      <input type="text" value={data.text} onChange={onChange}/>
    </div>
  );
})

// function CarName(props) {
//   console.log('CarNme');
//     const {data, onChange}=props
//   return (
//     <div>
//       <div>Update Car Name</div>
//       <input type="text" value={data.text} onChange={onChange}/>
//     </div>
//   );
// }

const Test = () => {
  const [info, setInfo] = useState(initialState);

  const onRoomChange = (e)=>{
    setInfo((state)=>{
      // ============== IMMER =============== //
      const newState = produce(state,(draft)=>{
        draft[0].rooms[0].text=e.target.value

      })

/*
========================================================
                SHALLOW COPY STATE UPDATE
========================================================
*/
        // let newState=[
        //     {
        //         ...state[0],
        //         rooms:[
        //             {
        //                 ...state[0].rooms[0],
        //                 text:e.target.value
        //             }
        //         ]
        //     },
        //     state[1]
        // ]


/*
========================================================
                DEEP COPY STATE UPDATE
========================================================
deep copy issue 
*/
        // const newState=JSON.parse(JSON.stringify(state));
        // newState[0].rooms[0].text=e.target.value
        return newState
    });
  }

  
  console.log(info);

  const onCarChange = useCallback((e)=>{
    setInfo((state)=>{
        // ============== IMMER =============== //
      const newState = produce(state, (draft)=>{
        draft[1].text=e.target.value
      })
/*
========================================================
                SHALLOW COPY STATE UPDATE
========================================================
*/
        // const newState=[
        //     state[0],
        //     {
        //         ...state[1],
        //         text:e.target.value
        //     }
        // ]

        /*
========================================================
                DEEPLOW COPY STATE UPDATE
========================================================

*/

      // const newState =JSON.parse(JSON.stringify(state));
      // newState[1].text=e.target.value

        return newState
    })
  },[]);


  return (
    <div>
      <RoomName data={info[0].rooms[0]} onChange={onRoomChange}/>
      <CarName data={info[1]} onChange={onCarChange}/>
    </div>
  );
};

export default Test;
