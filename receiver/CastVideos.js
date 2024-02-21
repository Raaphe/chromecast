let session;
let media;
let isPlaying = true;
const seekSlider = document.getElementById('media-slider');
const defaultContentType = 'video/mp4';
let currentVideoIndex = 0;
const applicationID = '3DDC41A0';
const videoList = [
    'https://transfertco.ca/video/DBillPrelude.mp4',
    'https://transfertco.ca/video/DBillSpotted.mp4',
    'https://transfertco.ca/video/usa23_7_02.mp4'
    // Add more video URLs as needed
];





document.getElementById('cast-btn').addEventListener('click', () => {
    initializeApiOnly();
});

// TODO: start not made
document.getElementById('startBtn').addEventListener('click', () => {
    if (session) {
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('back-10').addEventListener('click', () => {
    if (session) {
        seek(false);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('forward-10').addEventListener('click', () => {
    if (session) {
        seek(true);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (session) {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});


document.getElementById('pause-play').addEventListener('click', () => {
    if (media) {
        if (isPlaying) {
            media.pause(null, onMediaCommandSuccess, onError);
        } else {
            media.play(null, onMediaCommandSuccess, onError);
        }
        isPlaying = !isPlaying;
    }
});

//  TODO: 
function sessionListener(newSession) {
    session = newSession;
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('next').style.display = 'block';
}

function onMediaDiscovered(mediaItem) {
    media = mediaItem;
    document.getElementById('pause-play').style.display = 'block';
}

function receiverListener(availability) {
    if (availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
        document.getElementById('cast-btn').style.display = 'block';
    } else {
        document.getElementById('cast-btn').style.display = 'none';
    }
}

function onInitSuccess() {
    console.log('Chromecast init success');
}

function onError(error) {
    console.error('Chromecast initialization error', error);
}

function onMediaCommandSuccess() {
    console.log('Media command success');
}

function initializeApiOnly() {
    
    const sessionRequest = new chrome.cast.SessionRequest(applicationID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function loadMedia(videoUrl) {
    const mediaInfo = new chrome.cast.media.MediaInfo(videoUrl, 'video/mp4');
    const request = new chrome.cast.media.LoadRequest(mediaInfo);

    session.loadMedia(request, onMediaDiscovered, onError);
}

function seek(isForward) {
    try {
        const seekTime = isForward ? 10 : -10; // 10 seconds forward or backward
        remotePlayer.currentTime += seekTime;
        remotePlayerController.seek();
    } catch {
        remotePlayer.currentTime = 0;
    }
}

function initializeSeekSlider(remotePlayerController, mediaSession) {
    currentMediaSession = mediaSession;
    document.getElementById('playBtn').style.display = 'block';
   // Set max value of seek slider to media duration in seconds
   seekSlider.max = mediaSession.media.duration;

    // Update seek slider and time elements on time update
    updateInterval = setInterval(() => {
        const currentTime = mediaSession.getEstimatedTime();
        const totalTime = mediaSession.media.duration;
  
        seekSlider.value = currentTime;
        currentTimeElement.textContent = formatTime(currentTime);
        totalTimeElement.textContent = formatTime(totalTime);
      }, 1000); //chaque 1000 ms... 1 sec
  
      // slider change
      seekSlider.addEventListener('input', () => {
        const seekTime = parseFloat(seekSlider.value);
        remotePlayerController.seek(seekTime);
      });
}


// Function to initialize the Cast SDK
function initializeCastApi() {

    // Set up Cast SDK options
    const castOptions = new cast.framework.CastOptions();
    castOptions.receiverApplicationId = applicationID;

    // Initialize CastContext with the CastOptions
    const castContext = cast.framework.CastContext.getInstance();
    castContext.setOptions(castOptions);
    
    // Your existing event listener and button click handling code
    const castButton = document.getElementById('cast-btn');
    cast.framework.CastContext.getInstance().addEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        function(event) {
            switch (event.castState) {
                case cast.framework.CastState.NO_DEVICES_AVAILABLE:
                    castButton.disabled = true;
                    break;
                case cast.framework.CastState.NOT_CONNECTED:
                    castButton.disabled = false;
                    break;
                case cast.framework.CastState.CONNECTING:
                case cast.framework.CastState.CONNECTED:
                    castButton.disabled = true;
                    break;
            }
        }
    );


    // Add a click event listener to the Cast button
    castButton.addEventListener('click', function() {
        // Get the current Cast session
        const session = castContext.getCurrentSession();

        // Check if there is an active Cast session
        if (session) {
            // Already connected - do nothing or disconnect if needed
        } else {
            // Not connected - initiate a Cast session
            castContext.requestSession().then(
                function() {
                    // Handle successful connection
                    console.log('Connected to Chromecast');
                    initializeApiOnly();
                },
                function(errorCode) {
                    // Handle connection error
                    console.error('Error connecting to Chromecast: ' + errorCode);
                }
            );
        }
    });
}
