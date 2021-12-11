import React from "react";
import User from "./user";

const Users = ({users,...rest}) => {
    return (
     <table className="table caption-top">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качество</th>
              <th scope="col">Професия</th>
              <th scope="col">Встретился,раз</th>
              <th>Оценка</th>
              <th>Избранное</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
               {
                 <User props={users}
                 functions={rest}/>
                } 
          </tbody>
    </table>
    )
}

export default Users