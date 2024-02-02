import { useState } from 'react';
import './App.css';

function App() {

  const [rno, setRno] = useState("");
  const [name, setName] = useState("");
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [s3, setS3] = useState("");
  const [s4, setS4] = useState("");
  const [s5, setS5] = useState("");
  const [print, setPrint] = useState([]);
  const [search, setSearch] = useState("");
  const [final,setFinal] = useState([]);

  // const [total, setTotal] = useState("");
  // const [avg, setAvg] = useState("");
  // const [min, setMin] = useState("");
  // const [max, setMax] = useState("");
  // const [temp, setTemp] = useState("");
  // const [result, setResult] = useState("");

  const get = () => {

    let total = parseInt(s1) + parseInt(s2) + parseInt(s3) + parseInt(s4) + parseInt(s5);
    // setTotal(tot);
    // console.log(total);

    let per = total / 5;
    // setAvg(per);

    let low = Math.min(parseInt(s1), parseInt(s2), parseInt(s3), parseInt(s4), parseInt(s5));
    // setMin(low);

    let high = Math.max(parseInt(s1), parseInt(s2), parseInt(s3), parseInt(s4), parseInt(s5));
    // setMax(high);

    let t = 0;
    if (s1 > 35) {
      t = t + 1;
    }
    if (s2 > 35) {
      t = t + 1;
    }
    if (s3 > 35) {
      t = t + 1;
    }
    if (s4 > 35) {
      t = t + 1;
    }
    if (s5 > 35) {
      t = t + 1;
    }

    // setTemp(t)
    let result;

    if (t == 5) {
      result = "pass"
    }
    else if (t == 3 || t == 4) {
      result = "ATKT";
    }
    else {
      result = "Fail";
    }

    setPrint([...print, { rno, name, s1, s2, s3, s4, s5, total: total, avg: per, min: low, max: high, result: result }]);
    setFinal([...print, { rno, name, s1, s2, s3, s4, s5, total: total, avg: per, min: low, max: high, result: result }]);
    setRno('');
    setName('');
    setS1('');
    setS2('');
    setS3('');
    setS4('');
    setS5('');
  }

  const color = (result) => {
    if (result === "pass") {
      return "green";
    }
    else if (result === "ATKT") {
      return "blue";
    }
    else if (result === "Fail") {
      return "red";
    }
  }

  const sort = () => {
    let s = [...print];
    for(let i = 0;i< s.length;i++){
      for(let j = i+1;j<s.length;j++){
        if(s[i].avg < s[j].avg){
          let temp = s[i];
          s[i] = s[j];
          s[j] = temp;
        }
      }
    }
    setPrint(s);
  }

  return (
    <div className="App">

      <input type="text" placeholder='Enter RollNo' onChange={(e) => setRno(e.target.value)} value={rno} />
      <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} value={name} />
      <input type="text" placeholder='Enter s1' onChange={(e) => setS1(e.target.value)} value={s1} />
      <input type="text" placeholder='Enter s2' onChange={(e) => setS2(e.target.value)} value={s2} />
      <input type="text" placeholder='Enter s3' onChange={(e) => setS3(e.target.value)} value={s3} />
      <input type="text" placeholder='Enter s4' onChange={(e) => setS4(e.target.value)} value={s4} />
      <input type="text" placeholder='Enter s5' onChange={(e) => setS5(e.target.value)} value={s5} />
      <input type="button" value={"get"} onClick={() => get()} />
      <input type='button' value={"Sort"} onClick={() => sort()} />
      <input type="text" placeholder="Search" value={search} onChange={(e) => {
        setSearch(e.target.value)
        let s = final.filter((val, i) => {
          return Number(val.avg) >= Number(e.target.value) ? val : "";
        })
        setPrint(s);
      }} />

      <input type="checkbox" onChange={(e) => {
        if (e.target.checked === true) {
          let p = final.filter((val, i) => {
            return val.result === "pass" ? val : ""
          })
          setPrint(p);
        }
        else{
          setPrint([...final]);
        }
      }} />PASS

      <input type="checkbox" onChange={(e) => {
        if (e.target.checked === true) {
          let atkt = final.filter((val, i) => {
            return val.result === "ATKT" ? val : ""
          })
          setPrint(atkt);
        }
        else{
          setPrint([...final]);
        }
      }} />ATKT

      <input type="checkbox" onChange={(e) => {
        if (e.target.checked === true) {
          let f = final.filter((val, i) => {
            return val.result === "Fail" ? val : ""
          })
          setPrint(f);
        }
        else{
          setPrint([...final]);
        }
      }} />FAIL

      <div>
        <h3>Student Details:</h3>
        <table border="1" cellSpacing={0}>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Subject 1</th>
              <th>Subject 2</th>
              <th>Subject 3</th>
              <th>Subject 4</th>
              <th>Subject 5</th>
              <th>Total</th>
              <th>Percentage</th>
              <th>Min</th>
              <th>Max</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>

            {
              print.map((ele, index) => {
                return (
                  <>
                    <tr style={{ backgroundColor: color(ele.result), color: "white" }} >
                      <td>{ele.rno}</td>
                      <td>{ele.name}</td>
                      <td>{ele.s1}</td>
                      <td>{ele.s2}</td>
                      <td>{ele.s3}</td>
                      <td>{ele.s4}</td>
                      <td>{ele.s5}</td>
                      <td>{ele.total}</td>
                      <td>{ele.avg}</td>
                      <td>{ele.min}</td>
                      <td>{ele.max}</td>
                      <td>{ele.result}</td>
                    </tr>
                  </>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App  