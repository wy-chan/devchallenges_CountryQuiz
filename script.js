class MyApp extends React.Component{
    constructor(props){
      super(props);
      this.state={
        currentType: "Capital",
        currentPage: "QuestionPage",
        correctTotal:0,
        currentList:[],
        currentA:{},
        currentB:{},
        currentC:{},
        currentD:{},
        clickABCD:[false,false,false,false],
        currentAnswerInfo:{},
        NextSeeBtn: "",
        items:[],
        DataisLoaded: false,
      };
      this.getRandomList=this.getRandomList.bind(this);
      this.getRandomNumbers=this.getRandomNumbers.bind(this);
      this.getRandomData=this.getRandomData.bind(this);
      this.getQNA=this.getQNA.bind(this);
      this.getAnswer=this.getAnswer.bind(this);
      this.loadPage=this.loadPage.bind(this);
      this.handleNext=this.handleNext.bind(this);
      this.handleResult=this.handleResult.bind(this);
      this.handleTryAgain=this.handleTryAgain.bind(this);
    }
    componentDidMount() {
      fetch("https://restcountries.com/v3.1/all")
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  items: json.filter(item=> item.capital),//remove if [capital] is blank >_<
                  DataisLoaded: true
              });
              this.getQNA();
          });
    }

    getRandomData(items){
      return items[Math.floor(Math.random()*items.length)];
    }

    getRandomNumbers(numberList){
      while(numberList.length < 4){
        let newNumber = Math.floor(Math.random()*this.state.items.length);
        if(numberList.indexOf(newNumber) == -1){
          numberList.push(newNumber);
          this.getRandomNumbers(numberList); //Recursion (´• ω •`)ﾉ Does it works??
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
        "flag":item.flags.png,
      }))
      return newList;
    }

    getQNA(){
      let randomList = this.getRandomList(this.state.items);
      let randomNumber = this.getRandomData([0,1,2,3]);
      
      randomList = randomList.map((item, index )=> ({
        ...item, answer: (randomNumber == index)? true: false//Add true||false to the answer (´• ω •`)ﾉ
      }))

      this.setState({
        currentList: randomList,
        currentA: randomList[0],
        currentB: randomList[1],
        currentC: randomList[2],
        currentD: randomList[3],
        currentAnswerInfo:randomList[randomNumber],
      });

      console.log(randomList);
      console.log(randomNumber);
    }


    getAnswer(event){
      let index = event.currentTarget.id.charAt(0);
      let updateABCD = this.state.clickABCD;
      updateABCD[index]= true;
      console.log(updateABCD);
      this.setState({clickABCD: updateABCD});
      console.log(this.state.currentAnswerInfo.name.toString().replace(/\s/g, '')+event.currentTarget.id.toString());
      if(this.state.currentAnswerInfo.name.toString().replace(/\s/g, '') == event.currentTarget.id.toString().substring(1)){
        this.setState({
          correctTotal: this.state.correctTotal+1,
          NextSeeBtn: "Next",
        });
      }else{
        this.setState({
          NextSeeBtn: "SeeResult",
        });
      } 
      this.setState({
        currentPage: "AnswerPage",
      });
    }

    handleNext(){
      this.setState({
        currentPage: "QuestionPage",
        currentList:[],
        currentA:{},
        currentB:{},
        currentC:{},
        currentD:{},
        clickABCD:[false,false,false,false],
        currentAnswerInfo:{},
        NextSeeBtn: "",
      });
      if(this.state.currentType == "Capital"){
        this.setState({currentType:"Flag"})
      }else{
        this.setState({currentType:"Capital"})
      };
      this.getQNA();
      console.log(this.state.correctTotal);
    }
    
    handleResult(){
      this.setState({
        currentPage: "ResultPage",
      });
    }

    handleTryAgain(){
      this.setState({
        correctTotal:0,
      })
      this.handleNext();
    }

    loadPage(page){
      switch(page){
        case "QuestionPage": 
        return <QuestionPage
              currentQuestion={this.state.currentAnswerInfo}
              currentList={this.state.currentList}
              currentA={this.state.currentA}
              currentB={this.state.currentB}
              currentC={this.state.currentC}
              currentD={this.state.currentD}
              getAnswer={this.getAnswer}
              currentType={this.state.currentType}
        />;
        break;
        case "AnswerPage": 
        return <AnswerPage
              currentQuestion={this.state.currentAnswerInfo}
              currentList={this.state.currentList}
              currentA={this.state.currentA}
              currentB={this.state.currentB}
              currentC={this.state.currentC}
              currentD={this.state.currentD}
              getAnswer={this.getAnswer}
              NextSeeBtn={this.state.NextSeeBtn}
              handleNext={this.handleNext}
              handleResult={this.handleResult}
              currentAnswerInfo={this.state.currentAnswerInfo}
              currentType={this.state.currentType}
              clickABCD={this.state.clickABCD}
        />;
        break;
        case "ResultPage" : 
        return <ResultPage 
              correctTotal={this.state.correctTotal}
              handleTryAgain={this.handleTryAgain}
        />;
        break;
        default:   return null;
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
      const questionType = (this.props.currentType == "Capital")? 
                            <QuestionCapital 
                              currentQuestion={this.props.currentQuestion.capital}
                            />:
                            <QuestionFlag 
                              currentQuestion={this.props.currentQuestion.flag}
                            />;
      return(
        <div id="question-page" className="">
          <img id="question-icon" src="images/undraw_adventure_4hum 1.svg" className=""/>
            {questionType}
          <ul id="options-box">
            <MyOptions 
            letter='0' 
            currentText={this.props.currentA} 
            getAnswer={this.props.getAnswer}
            showNextBtn={this.props.showNextBtn}
            showSeeBtn={this.props.showSeeBtn}/>
            <MyOptions 
            letter='1' 
            currentText={this.props.currentB} 
            getAnswer={this.props.getAnswer}
            showNextBtn={this.props.showNextBtn}
            showSeeBtn={this.props.showSeeBtn}/>
            <MyOptions 
            letter='2' 
            currentText={this.props.currentC} 
            getAnswer={this.props.getAnswer}
            showNextBtn={this.props.showNextBtn}
            showSeeBtn={this.props.showSeeBtn}/>
            <MyOptions 
            letter='3' 
            currentText={this.props.currentD} 
            getAnswer={this.props.getAnswer}
            showNextBtn={this.props.showNextBtn}
            showSeeBtn={this.props.showSeeBtn}/>
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
  const showbtn = (this.props.NextSeeBtn == "Next")?
                  <NextBtn handleNext={this.props.handleNext}/>:
                  <SeeResult handleResult={this.props.handleResult}/>;
  const questionType = (this.props.currentType == "Capital")? 
                  <QuestionCapital 
                    currentQuestion={this.props.currentQuestion.capital}
                  />:
                  <QuestionFlag 
                    currentQuestion={this.props.currentQuestion.flag}
                  />;
      return(
        <div id="question-page" className="">
          <img id="question-icon" src="images/undraw_adventure_4hum 1.svg" className=""/>
          {questionType}
          <ul id="options-box">
            <MyOptionsAnswer 
            letter='0' 
            currentText={this.props.currentA}
            getAnswer={this.props.getAnswer}
            NextSeeBtn={this.props.NextSeeBtn}
            currentAnswerInfo={this.props.currentAnswerInfo}
            currentClick={this.props.clickABCD[0]}
            />
            <MyOptionsAnswer  
            letter='1' 
            currentText={this.props.currentB} 
            getAnswer={this.props.getAnswer}
            NextSeeBtn={this.props.NextSeeBtn}
            currentAnswerInfo={this.props.currentAnswerInfo}
            currentClick={this.props.clickABCD[1]}/>
            <MyOptionsAnswer 
            letter='2' 
            currentText={this.props.currentC} 
            getAnswer={this.props.getAnswer}
            NextSeeBtn={this.props.NextSeeBtn}
            currentAnswerInfo={this.props.currentAnswerInfo}
            currentClick={this.props.clickABCD[2]}/>
            <MyOptionsAnswer  
            letter='3' 
            currentText={this.props.currentD} 
            getAnswer={this.props.getAnswer}
            NextSeeBtn={this.props.NextSeeBtn}
            currentAnswerInfo={this.props.currentAnswerInfo}
            currentClick={this.props.clickABCD[3]}/>
          </ul>
          {showbtn}
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
          <img id="flag-img" src={this.props.currentQuestion} className="flag-img"/>
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

        const letter = (this.props.letter == 0)? "A":
                       (this.props.letter == 1)? "B":
                       (this.props.letter == 2)? "C":"D";
          
        let bntID = (this.props.letter+this.props.currentText.name).toString().replace(/\s/g, '');

        return(
        <li>
        <button onClick={this.props.getAnswer} className="options" id={bntID}>
        <span className="answers-box">
          <span className="letter-option">{letter}</span>
          <span className="answers">{this.props.currentText.name}</span>
        </span>
        </button>
        </li>
        )
    }
}

class MyOptionsAnswer extends React.Component{
  constructor(props){
    super(props);
  };
  render(){

     const letter = (this.props.letter == 0)? "A":
                    (this.props.letter == 1)? "B":
                    (this.props.letter == 2)? "C":"D";

     const btnClass = (!this.props.currentClick && !this.props.currentText.answer)? "options":
                      (!this.props.currentText.answer)? "options wrong-ans":
                      (this.props.currentClick)? "options right-ans":"options right-ans1";

     const icon=(this.props.currentAnswerInfo.name == this.props.currentText.name)? <RightIcon/>: 
                (this.props.currentClick)? <WrongIcon/>:null;

     let bntID = (this.props.letter+this.props.currentText.name).toString().replace(/\s/g, '');

      return(
      <li>
      <button className={btnClass} id={bntID} disabled>
      <span className="answers-box">
        <span className="letter-option">{letter}</span>
        <span className="answers">{this.props.currentText.name}</span>
      </span>
      {icon}
      </button>
      </li>
      )
  }
}

class RightIcon extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
      return(
        <span className="material-icons-round circle-icon">
        check_circle_outline
       </span>
        )
      }
}

class WrongIcon extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
      return(
        <span className="material-icons-round circle-icon">
        highlight_off
       </span>
        )
      }
}

class NextBtn extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
      return(
          <button id="next-btn" className="next-btn" onClick={this.props.handleNext}>Next</button>
        )
      }
}

class SeeResult extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
      return(
          <button id="next-btn" className="next-btn" onClick={this.props.handleResult}>See Result</button>
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
          <img id="result-icon" src="images/undraw_winners_ao2o 2.svg" className=""/>
          <h3 id="result-heading">Results</h3>
          <p>You got <em>{this.props.correctTotal}</em> correct answers</p>
          <button id="try-btn" onClick={this.props.handleTryAgain}>Try again</button>
        </div>
      )
  }
}

ReactDOM.render(<MyApp />, document.getElementById('myApp'));
  
