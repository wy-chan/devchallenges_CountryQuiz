class MyApp extends React.Component{
    constructor(props){
      super(props);
      this.state={
        currentQuestion: "Question",
        currentAnswer: "Answer",
        currentA: "Option A",
        currentB: "Option B",
        currentC: "Option C",
        currentD: "Option D",
      };
    }

    render(){
        return(
        <div>
          <h1>Country Quiz</h1>
          <img id="question-icon" src="images/undraw_adventure_4hum 1.svg" className=""/>

          <QuizBox 
            currentQuestion={this.state.currentQuestion}
            currentA={this.state.currentA}
            currentB={this.state.currentB}
            currentC={this.state.currentC}
            currentD={this.state.currentD}
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
            <QuestionPage
              currentQuestion={this.props.currentQuestion}
              currentA={this.props.currentA}
              currentB={this.props.currentB}
              currentC={this.props.currentC}
              currentD={this.props.currentD}
            />
            
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
            <QuestionCapital 
            currentQuestion={this.props.currentQuestion}
            />
          <ul id="options-box">
            <MyOptions letter='A' currentText={this.props.currentA}/>
            <MyOptions letter='B' currentText={this.props.currentB}/>
            <MyOptions letter='C' currentText={this.props.currentC}/>
            <MyOptions letter='D' currentText={this.props.currentD}/>
          </ul>
          <button id="next-btn" className="next-btn hidden">Next</button>
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
        <button className="options">
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
          <p>You got <em>4</em> correct answers</p>
          <button id="try-btn">Try again</button>
        </div>
      )
    }
}

ReactDOM.render(<MyApp />, document.getElementById('myApp'));
  
