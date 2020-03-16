(function () {
  const INDEX_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users/'
  const SHOW_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users/'
  const dataPanel = document.getElementById('data-panel')
  const data = JSON.parse(localStorage.getItem('favoriteUsers')) || []
  const modalTitle = document.getElementById('show-movie-title')
  const modalImage = document.getElementById('show-movie-image')
  const modalDescription = document.getElementById('show-movie-description')



  displayDataList(data)




  // 點擊 More 按鈕事件
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      const id = event.target.dataset.id
      console.log(event.target.dataset.id)
      modalTitle.innerHTML = ''
      modalImage.innerHTML = ''
      modalDescription.innerHTML = ''
      showUser(id)
    }
    else if (event.target.matches('.btn-remove-favorite')) {
      removeFavoriteItem(event.target.dataset.id)
    }
  })




  // 點擊 More 按鈕後顯示該用戶個人詳細內容 
  function showUser(id) {
    const url = SHOW_URL + id
    console.log(url)
    axios.get(url)
      .then((response) => {
        // insert data into modal ui
        const data = response.data
        const title = data.name + " " + data.surname
        console.log(response.data.name)
        modalTitle.textContent = title
        modalImage.innerHTML = `<img class="card-img-top" src="${data.avatar}" alt="Card image cap">`
        modalDescription.innerHTML = `
          <h6>Eamil : ${data.email}</h6>
          <h6>Gender : ${data.gender}</h6>
          <h6>Region : ${data.region}</h6>
          <h6>Age : ${data.age}</h6>
        `
      })
      .catch((err) => console.log(err))
  }


  function removeFavoriteItem(id) {
    // find movie by id
    const index = data.findIndex(item => item.id === Number(id))
    console.log(index)
    if (index === -1) return

    // removie movie and update localStorage
    data.splice(index, 1)
    localStorage.setItem('favoriteUsers', JSON.stringify(data))

    // repaint dataList
    displayDataList(data)
  }



  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
      <div class="col-4">
        <div class="card" style = "width: 18rem" >
          <img class="card-img-top" src="${item.avatar}" alt="Card image cap">
          <div class="card-body">
            <div class="row">
              <h5 class="card-title col-6">${item.name}</h5>
              <button class="btn btn-primary btn-show-movie col-3" data-toggle="modal" data-target="#show-movie-modal" data-id=${item.id}>More</button>
              <!-- favorite button -->
              <button class="btn btn-danger btn-remove-favorite offset-1" data-id="${item.id}">x</button>
            </div>
          </div>
        </div>
      </div>
      `
      dataPanel.innerHTML = htmlContent
      console.log(data)
    })
  }
})()