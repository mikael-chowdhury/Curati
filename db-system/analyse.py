import librosa
from pytubefix import YouTube, Search
import shlex
import os
import time
import numpy as np
import psycopg2

def convert_to_native_types(features):
    # Convert numpy scalar types (like float32, int64) to native Python types
    # and leave numpy arrays as lists (or convert them to their mean if desired)
    return {
        key: value.item() if isinstance(value, np.generic) else value.tolist() if isinstance(value, np.ndarray) else value
        for key, value in features.items()
    }

def analyse_song(queue):
    conn = psycopg2.connect(database="SongMetadataDatabase",
                        host="localhost",
                        user="",
                        password="",
                        port="5432")

    cur = conn.cursor()

    while True:
        _song = queue.get()

        song = Search(_song[0] + " by " + _song[1]).results[0]
        YouTube(song.watch_url).streams.filter(only_audio=True).first().download("./songs")

        y,sr = librosa.load(f"./songs/{song.title}.m4a")

        stft = np.abs(librosa.stft(y))
        
        features = {
            'tempo': librosa.beat.tempo(y=y, sr=sr)[0],
            'key': librosa.feature.chroma_cqt(y=y, sr=sr).mean(axis=1).argmax(),
            'loudness': librosa.feature.rms(y=y).mean(),
            'zero_crossing_rate': librosa.feature.zero_crossing_rate(y=y).mean(),
            'spectral_centroid': librosa.feature.spectral_centroid(S=stft, sr=sr).mean(),
            'mfcc': librosa.feature.mfcc(S=librosa.power_to_db(stft), sr=sr, n_mfcc=13).mean(axis=1),
            'chroma_stft': librosa.feature.chroma_stft(S=stft, sr=sr).mean(axis=1)
        }

        os.remove(f"./songs/{song.title}.m4a")

        features = convert_to_native_types(features)


        # Prepare the values to be inserted
        mfcc_values = features['mfcc']
        chroma_stft_values = features['chroma_stft']

        # Create the insert query
        query = """
        INSERT INTO song_metadata_analysed (
            name, artist, album, tempo, key, loudness, zero_crossing_rate, 
            spectral_centroid, mfcc_1, mfcc_2, mfcc_3, mfcc_4, mfcc_5, mfcc_6, 
            mfcc_7, mfcc_8, mfcc_9, mfcc_10, mfcc_11, mfcc_12, mfcc_13, 
            chroma_stft_1, chroma_stft_2, chroma_stft_3, chroma_stft_4, chroma_stft_5, 
            chroma_stft_6, chroma_stft_7, chroma_stft_8, chroma_stft_9, chroma_stft_10, 
            chroma_stft_11, chroma_stft_12
        ) VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        )
        """

        # Prepare the values tuple for insertion
        values = (
            _song[0], _song[1], _song[2], features['tempo'], features['key'], 
            features['loudness'], features['zero_crossing_rate'], features['spectral_centroid'], 
            *mfcc_values, *chroma_stft_values
        )

        # Execute the query
        cur.execute(query, values)

        cur.execute("DELETE FROM song_metadata_unanalysed WHERE name=%s AND artist=%s AND album=%s", (_song[0],_song[1],_song[2],))

        conn.commit()
        
        break