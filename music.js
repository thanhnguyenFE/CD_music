const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const playlist=$('.playlist')
const cd = $('.cd')
const progress = $('#progress')
const heading = $('header h2')
const cdThumb= $('.cd-thumb')
const audio = $('audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const ranDomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')


const app ={
    currentIndex:0,
    isPlaying:false,
    isRanDom: false,
    isRepeat: false,
     songs : [
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: '/audio/Mashup-Nevada-x-Di-Di-Di-Daniel-Mastro-Remix-K-ICM-T-ICM-Zickky-Kelsey.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/f/8/b/3f8b3ba7387b81bf286658ea069b874f.jpg'
        },
        {
            name: '11:11',
            singer: 'Vicetone',
            path: '/audio/1111-YDol-5663482.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/0/c/9/40c979fecdbde04e31d072292f2ca5b2.jpg'
        },
        {
            name: 'Bật tình yêu lên',
            singer: 'Vicetone',
            path: '/audio/BatTinhYeuLen-TangDuyTanHoaMinzy-8715666.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/2/d/5/c/2d5cc8bc9f930ce292c464e929ea31fb.jpg'
        },
        {
            name: 'Kìa bóng dáng ai',
            singer: 'Vicetone',
            path: '/audio/KiaBongDangAi-Phao-8544353.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/6/3/f/b/63fb6b25051e8d0bb4f9561158f16ae9.jpg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: '/audio/Mashup-Nevada-x-Di-Di-Di-Daniel-Mastro-Remix-K-ICM-T-ICM-Zickky-Kelsey.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/f/8/b/3f8b3ba7387b81bf286658ea069b874f.jpg'
        },
        {
            name: '11:11',
            singer: 'Vicetone',
            path: '/audio/1111-YDol-5663482.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/0/c/9/40c979fecdbde04e31d072292f2ca5b2.jpg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: '/audio/Mashup-Nevada-x-Di-Di-Di-Daniel-Mastro-Remix-K-ICM-T-ICM-Zickky-Kelsey.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/f/8/b/3f8b3ba7387b81bf286658ea069b874f.jpg'
        },
        {
            name: '11:11',
            singer: 'Vicetone',
            path: '/audio/1111-YDol-5663482.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/0/c/9/40c979fecdbde04e31d072292f2ca5b2.jpg'
        },
        {
            name: 'Bật tình yêu lên',
            singer: 'Vicetone',
            path: '/audio/BatTinhYeuLen-TangDuyTanHoaMinzy-8715666.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/2/d/5/c/2d5cc8bc9f930ce292c464e929ea31fb.jpg'
        },
        {
            name: 'Kìa bóng dáng ai',
            singer: 'Vicetone',
            path: '/audio/KiaBongDangAi-Phao-8544353.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/6/3/f/b/63fb6b25051e8d0bb4f9561158f16ae9.jpg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: '/audio/Mashup-Nevada-x-Di-Di-Di-Daniel-Mastro-Remix-K-ICM-T-ICM-Zickky-Kelsey.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/f/8/b/3f8b3ba7387b81bf286658ea069b874f.jpg'
        },
        {
            name: '11:11',
            singer: 'Vicetone',
            path: '/audio/1111-YDol-5663482.mp3',
            image:'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/0/c/9/40c979fecdbde04e31d072292f2ca5b2.jpg'
        },
    ],
        render: function(){
    const htmls = this.songs.map((song,index) => {
        return `
            <div class="song ${index ===this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb"
                style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
            </div>          
        `
    });
    playlist.innerHTML=htmls.join('')
        },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function(){  
        const _this = this
        const sdWidth = cd.offsetWidth
        // Xử lí CD quay / dừng
        const cdThumAnimate = cdThumb.animate([
            {transform: 'rotate(360deg'}
        ],{
            duration: 10000,
            iterations: Infinity
        })
        cdThumAnimate.pause()
        //Xử lí co dãn CD
        document.onscroll=  function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdwidth = sdWidth - scrollTop
            cd.style.width=newCdwidth>0 ? newCdwidth + 'px' :0
            cd.style.opacity = newCdwidth / sdWidth
        }
        // Xử lí khi click play
         playBtn.onclick=function(){
           if(_this.isPlaying){
            audio.pause()
           } else {
            _this.isPlaying = true
               audio.play()
               
            }
           }
        // Khi song được play
        audio.onplay=function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumAnimate.play()
        }
        // Khi song được pause
        audio.onpause=function(){
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumAnimate.pause()
        }
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate=function(){
            if(audio.duration){
                const progressPercent = Math.round(audio.currentTime / audio.duration *100)
                progress.value = progressPercent
            }
            
        }
        //Xử lí khi tua song
        progress.oninput = function(e){
            const seekTime = audio.duration/100*e.target.value
            audio.currentTime = seekTime
        }
        // Khi next song
        nextBtn.onclick=function(){
            if(_this.isRanDom){
                _this.playRanDomSong()
            }
            else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // Khi prev song
        prevBtn.onclick=function(){
            if(_this.isRanDom){
                _this.playRanDomSong()
            }
            else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
       //Khai ramdon được bật / tắt
       ranDomBtn.onclick=function(e){
        _this.isRanDom=!_this.isRanDom
           ranDomBtn.classList.toggle('active', _this.isRanDom)
       }
       // Xử lí next Song khi audio end
       audio.onended=function(){
        if(_this.isRepeat){
            audio.play()
        }
        else{
            nextBtn.click()
        }
       }
       // Xử lí khi repeat song
       repeatBtn.onclick=function(e){
         _this.isRepeat=!_this.isRepeat
         repeatBtn.classList.toggle('active', _this.isRepeat)
       }

       // Lắng nghe hành vi click vào playlists
       playlist.onclick=function(e){
        const songNode = e.target.closest('.song:not(.active)')
        const optionNode = e.target.closest('.option')
           if(songNode|| optionNode){
              //Xử lí khi click vào song
            if(songNode ){
                _this.currentIndex =Number(songNode.dataset.index)
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }
            //Xử lí khi click vào song option
            if(optionNode){
                
            }
          }
       }
    },
    scrollToActiveSong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block: 'end'
            })
        },200)
    },   
    loadCurrentSong: function(){
        heading.innerHTML = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex>=this.songs.length){
            this.currentIndex=0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex<0){
            this.currentIndex=this.songs.length-1
        }
        this.loadCurrentSong()
    },
    playRanDomSong : function(){
        let newIndex 
        do{
             newIndex  = Math.floor(Math.random() * this.songs.length)   
        }
        while(newIndex==this.currentIndex)
        this.currentIndex=newIndex
        this.loadCurrentSong()
    },
    start : function(){
        this.defineProperties()
        this.render()
        this.handleEvent()
        this.loadCurrentSong()
    }
}
app.start()

