import './App.css';
import Table from './components/Table';
import tableData from './components/Table/tableData';

function App() {
  return (
      <div className="table-wrapper">
        <Table data={tableData}/>
    </div>
  );
}

export default App;
