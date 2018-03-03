var movies = JSON.parse(localStorage.getItem("new"));
class Search extends React.Component {
  constructor(props, context) {
  super(props, context);
    this.state = {
      photos: [],
      value: ''
    };
  }
  
  render() {

    function handleRemove(data) {
      movies.splice(data.target.id, 1);
      localStorage.setItem("new",JSON.stringify(movies));
   	}

   	function handleAdd(param, e) { 
      let src= 'http://farm' + param.farm + '.staticflickr.com/' + param.server + '/' + param.id + '_' + param.secret + '_m.jpg'
      movies.push(src)
      localStorage.setItem("new",JSON.stringify(movies));
    }
   	
    function handleChange(event) {
   	this.setState({value: event.target.value});   	
   } 
      
    function handleClick(e) {
      e.preventDefault();
	  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&text='+ this.state.value + '&api_key=d4f1da951332d649ca526c02df6ee46a&"machine_tags"%20=>%20"*:title="&format=json&nojsoncallback=1&per_page=100';
   	  fetch(url)
        .then(response => response.json())
        .then(function(data) {
          this.setState({
          photos: data.photos.photo
        });
        }.bind(this));
      console.log(this.state.photos); 
    }

  return (
    <div>
      <div>
        <input type="text" value={this.state.value} onChange={handleChange.bind(this)} />
        <a href="#" onClick={handleClick.bind(this)}> Search </a> 
      </div>
    <hr></hr>
       <div ref="iScroll" class="scroll">
        {this.state.photos.map(photo =>
        <div key={photo.id} class= "image">
          <a href="#" onClick={(e)=> handleAdd(photo, e)} >
            <img src={'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg'} height="200" width="200"/>
          </a>
        </div>
        )}
        </div>
        <div class="favorite">
        <h2 class="header"> Favourite </h2>
      {JSON.parse(localStorage.getItem("new")).map((item,i) =>
        <div key={i} class= "image"> 
          <a href="#" onClick={handleRemove.bind(this)} id={i} class="close">  </a>
          <img src={item} height="200" width="200"/>
        </div>)}
        </div>
    </div>
  )}
}