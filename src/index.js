import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import axios from 'axios'
import './style.css';

class App extends Component {
  constructor () {
        super()
        this.state = {
            empName: '',
            empId: 0,
            empImage: '',
            hrIds: [1,2,3,4,5],
            engIds: [6,7,8,9,10],
            actualList: [],
            isLoadData: false,
            shown: false
        }
    }

    getEmployeeDetails = () => {
      let userId = document.getElementById('employeeId').value
      this.setState({shown:true})
    axios.get('https://reqres.in/api/users/'+userId)
        .then(response => {
          console.log(response.data.data)
            let empInfo = response.data.data
            this.setState({
                empName: empInfo.first_name+' '+empInfo.last_name,
                empId: empInfo.id,
                empImage: empInfo.avatar,
                isLoadData: true,
                shown: false
            })
        })
  }
  updateEmployeeIds = () => {
      let departmentName = document.getElementById('department').value
      if(departmentName === 'HR'){
          this.setState({actualList: this.state.hrIds})
      } else {
        this.setState({actualList: this.state.engIds})
      }
  }
  clear = () => {
    document.getElementById('department').value = ''
   this.setState({actualList: [], isLoadData: false})
  }
  createOptions = () => {
    let options = []
    this.state.actualList.map((item, i) => {
              options.push(<option key={i} value={item}>{item}</option>);
     })
     return options
  }

  render() {
    const {actualList} = this.state
    return (
      <div>
      <div className="row" style={{margin: '0px'}}>
    
      
        <div className="col-sm-4">
          <label> Department:</label><br/>
          <select id='department' onChange={this.updateEmployeeIds}>
            <option name='HR' value=''> Select Department</option> 
            <option name='HR' value='HR'> HR</option> 
            <option name='ENGINEERING' value='ENGINEERING'> ENGINEERING</option> 
          </select>
        </div>
        <div className="col-sm-4">
          <label> Employee Id:</label><br/>
          <select id='employeeId' style={{width:'100px'}}>
            {this.createOptions()}
          </select>
        </div>
        <div className="col-sm-4" style={{marginTop:'20px'}}>
        <button onClick={() => this.getEmployeeDetails()} style={{margin:'10px'}}> GetDetails </button>
        <button onClick={() => this.clear()}> Clear </button>
        </div>
        </div>
        <div className="text-center" style={{display:this.state.shown? 'block':'none'}}>loading.....</div>
        {this.state.isLoadData ? <div className="wrapper">
        <div style={{border:'2px solid black', padding: '15px'}}>
          <img src ={this.state.empImage} style={{width:'100%'}}/>
          <div className='row'>
            <div className='col-sm-6'>
            ID: {this.state.empId}
            </div>
            <div className='col-sm-6'>
            Name: {this.state.empName}
            </div>
          </div>
          </div>
        </div> : undefined}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
