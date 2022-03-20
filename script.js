class MyApp extends React.Component{
    constructor(props){
      super(props);
      this.state={
        currentPage: "QuestionPage",
        currentQuestion: "",
        currentA: "",
        currentB: "",
        currentC: "",
        currentD: "",
        correctTotal:0,
        currentList:[],
        items:[],
        DataisLoaded: false,
      };
      this.getRandomList=this.getRandomList.bind(this);
      this.getRandomNumbers=this.getRandomNumbers.bind(this);
      this.getRandomData=this.getRandomData.bind(this);
      this.getQNA=this.getQNA.bind(this);
      this.getAnswer=this.getAnswer.bind(this);
      this.loadPage=this.loadPage.bind(this);
    }
    componentDidMount() {
      fetch("https://restcountries.com/v3.1/all")
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  items: json,
                  DataisLoaded: true
              });
              //console.log(this.state.items[Math.floor(Math.random(4)*250)]);
              this.getQNA();
          });
    }

    getRandomData(items){
      return items[Math.floor(Math.random()*items.length)];
    }

    getRandomNumbers(numberList){
      if(numberList.length < 4){
        let newNumber = Math.floor(Math.random()*250);
        if(numberList.indexOf(newNumber) == -1){
          numberList.push(newNumber);
          this.getRandomNumbers(numberList); //Recursion (´• ω •`)ﾉ
        } 
      }
      return numberList;
    }

    getRandomList(items){
      let numbers = this.getRandomNumbers([]);
      let newList = numbers.map(item => items[item]);
      newList = newList.map(item => ({
        "name":item.name.common,
        "capital":item.capital.join(''),
        "flag":item.flags.png
      }))
      console.log(newList);
      return newList;
    }

    getQNA(){
      let randomList = this.getRandomList(this.state.items);
      let randomNumber = this.getRandomData([0,1,2,3]);
      this.setState({
        currentList: randomList,
        currentQuestion: randomList[randomNumber].capital,
        currentA: randomList[0].name,
        currentB: randomList[1].name,
        currentC: randomList[2].name,
        currentD: randomList[3].name,
      });
    }

    getAnswer(){
      this.setState({
        currentPage: "AnswerPage",
      });
    }
    
    loadPage(page){
      switch(page){
        case "QuestionPage": 
        return <QuestionPage
              currentQuestion={this.state.currentQuestion}
              currentA={this.state.currentA}
              currentB={this.state.currentB}
              currentC={this.state.currentC}
              currentD={this.state.currentD}
              getAnswer={this.getAnswer}
        />;
        break;
        case "AnswerPage" : 
        return <AnswerPage
              currentQuestion={this.state.currentQuestion}
              currentA={this.state.currentA}
              currentB={this.state.currentB}
              currentC={this.state.currentC}
              currentD={this.state.currentD}
              getAnswer={this.getAnswer}
        />;
        break;
        case "ResultPage" : 
        return <ResultPage 
              correctTotal={this.state.correctTotal}
        />;
        break;
        default:   return <QuestionPage
        currentQuestion={this.state.currentQuestion}
        currentA={this.state.currentA}
        currentB={this.state.currentB}
        currentC={this.state.currentC}
        currentD={this.state.currentD}
        getAnswer={this.getAnswer}
      />;
      }
    }

    render(){
        return(
        <div>
          <h1>Country Quiz</h1>
          
          <QuizBox 
            loadPage={this.loadPage(this.state.currentPage)}
          />
        </div>
        )
    }
}

class QuizBox extends React.Component{
    constructor(props){
      super(props);
    };
    render(){
        return(
        <div id="quiz-box">
            {this.props.loadPage}
            
        </div>
        ) 
    }
}

class QuestionPage extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
      return(
        <div id="question-page" className="">
          <img id="question-icon" src="images/undraw_adventure_4hum 1.svg" className=""/>
            <QuestionCapital 
            currentQuestion={this.props.currentQuestion}
            />
          <ul id="options-box">
            <MyOptions letter='A' currentText={this.props.currentA} getAnswer={this.props.getAnswer}/>
            <MyOptions letter='B' currentText={this.props.currentB} getAnswer={this.props.getAnswer}/>
            <MyOptions letter='C' currentText={this.props.currentC} getAnswer={this.props.getAnswer}/>
            <MyOptions letter='D' currentText={this.props.currentD} getAnswer={this.props.getAnswer}/>
          </ul>
        </div>
      )
  }
}

class AnswerPage extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
      return(
        <div id="question-page" className="">
          <img id="question-icon" src="images/undraw_adventure_4hum 1.svg" className=""/>
            <QuestionCapital 
            currentQuestion={this.props.currentQuestion}
            />
          <ul id="options-box">
            <MyOptions letter='A' currentText={this.props.currentA}/>
            <MyOptions letter='B' currentText={this.props.currentB}/>
            <MyOptions letter='C' currentText={this.props.currentC}/>
            <MyOptions letter='D' currentText={this.props.currentD}/>
          </ul>
          <button id="next-btn" className="next-btn">Next</button>
        </div>
      )
  }
}

class QuestionCapital extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
      return(
        <h2 id="question">{this.props.currentQuestion} is the capital of</h2>
    )
  }
}

class QuestionFlag extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
      return(
        <div>
          <img id="flag-img" src="" className="flag-img"/>
          <h2 id="question">Which country does this flag belong to?</h2>
        </div>
    )
  }
}


class MyOptions extends React.Component{
    constructor(props){
      super(props);
    };
    render(){
        return(
        <li>
        <button className="options" disabled={false} onClick={this.props.getAnswer}>
        <span className="answers-box">
          <span className="letter-option">{this.props.letter}</span>
          <span className="answers">{this.props.currentText}</span>
        </span>
        <span className="material-icons-round circle-icon hidden">
           check_circle_outline
        </span>
        <span className="material-icons-round circle-icon hidden">
           highlight_off
        </span>
        </button>
        </li>
        )
    }
}

class ResultPage extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
      return(
        <div id="result-page" className="result-page">
          <img id="result-icon" src="images/undraw_winners_ao2o 2.svg" class=""/>
          <h3 id="result-heading">Results</h3>
          <p>You got <em>{this.props.correctTotal}</em> correct answers</p>
          <button id="try-btn">Try again</button>
        </div>
      )
    }
}

ReactDOM.render(<MyApp />, document.getElementById('myApp'));
  
