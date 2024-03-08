import requests, os, re
import boto3

voices = [
    {"voice_id": "21m00Tcm4TlvDq8ikWAM", "name": "Rachel"},
    {"voice_id": "AZnzlk1XvdvUeBnXmlld", "name": "Domi"},
    {"voice_id": "EXAVITQu4vr4xnSDxMaL", "name": "Bella"},
    {"voice_id": "ErXwobaYiN019PkySvjV", "name": "Antoni"},
    {"voice_id": "MF3mGyEYCl7XYWbV9V6O", "name": "Elli"},
    {"voice_id": "TxGEqnHWrfWFTfGW9XjX", "name": "Josh"},
    {"voice_id": "VR6AewLTigWG4xSOukaG", "name": "Arnold"},
    {"voice_id": "pNInz6obpgDQGcFmaJgB", "name": "Adam"},
    {"voice_id": "yoZ06aMxZJJ28mfd3POQ", "name": "Sam"}
]

def process_text(input_string):
    start_pattern = "*** START OF THE PROJECT GUTENBERG EBOOK"
    end_pattern = "*** END OF THE PROJECT GUTENBERG EBOOK"
   
    start_index = input_string.find(start_pattern)
    if start_index != -1:
        start_index += len(start_pattern)
    else:
        start_index = 0

    end_index = input_string.find(end_pattern, start_index)
    if end_index == -1:
        end_index = len(input_string)

    input_string = input_string[start_index:end_index]
    
    input_string = re.sub(r'\b[A-Z]+\b', '', input_string)
    
    input_string = input_string.replace('.\r', '')
    input_string = input_string.replace('.\n', '')
    input_string = input_string.replace('\r', '')
    input_string = input_string.replace('\n', '')
    
    input_string = re.sub(r'[^a-zA-Z0-9\s.,?]', '', input_string)
    return re.sub(r' +', ' ', input_string).strip()[0: 500]

def generateSpeech(text, filepath, voiceId=voices[0]["voice_id"]):
    print(len(text))
    # https://elevenlabs.io/
    CHUNK_SIZE = 1024
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voiceId}"

    headers = {
    "Accept": "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": "3f04364769109ba65166098630de83eb"
    }

    data = {
    "text": text,
    "model_id": "eleven_monolingual_v1",
    "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
    }
    }

    response = requests.post(url, json=data, headers=headers)
    with open(filepath, 'wb') as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                f.write(chunk)
    
    return filepath

def generateVideo(input, output):
    os.system(f"python ./backend/services/seewav/seewav.py -c 0.996,0.980,0.933 -B 30 {input} {output}")
    return output

def getEbook(bookId):
    tempEbook = requests.get(f"https://www.gutenberg.org/cache/epub/{bookId}/pg{bookId}.txt").text
    return process_text(tempEbook)

def uploadFile(bookId):
    aws_access_key_id = 'AKIAZQ3DP4PFJ7FQ4VSJ'
    aws_secret_access_key = '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'

    VIDEO_FILE_PATH = f'backend/media/{bookId}/video.mp4'
    UPLOAD_FILENAME = str(bookId) + '.mp4'
    bucket_name = 'chromecast-project'
    file_path = VIDEO_FILE_PATH
    file_key = f'videos/{UPLOAD_FILENAME}' 

    s3_client = boto3.client(
        's3',
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name='us-east-2'
    )

    # Upload the file
    s3_client.upload_file(
        file_path,
        bucket_name,
        file_key,
    )

    # Construct the URL
    url = f'https://{bucket_name}.s3.amazonaws.com/{file_key}'
    
    return url


def generateAudioBook(text, bookId):
    os.mkdir(f'backend/media/{bookId}')
    generateVideo(generateSpeech(text, f"backend/media/{bookId}/audio.mp3"), f"backend/media/{bookId}/video.mp4")
    url = uploadFile(bookId)
    
    f = open(f"backend/media/{bookId}/url.txt", "w")
    f.write(url)
    f.close()
    
    return url
