import time
from pytubefix import YouTube,Search
import librosa
from analyse import analyse_song
from multiprocessing import Process,Queue
import psycopg2

if __name__ == "__main__":
    NUM_PROCESSES = 2

    conn = psycopg2.connect(database="SongMetadataDatabase",
                            host="localhost",
                            user="",
                            password="",
                            port="5432")

    cur = conn.cursor()

    # cur.execute("""
    # CREATE TABLE song_metadata_analysed (
    #     name VARCHAR(255),
    #     artist VARCHAR(255),
    #     album VARCHAR(255),
    #     tempo FLOAT,
    #     key INT,
    #     loudness FLOAT,
    #     zero_crossing_rate FLOAT,
    #     spectral_centroid FLOAT,
    #     mfcc_1 FLOAT,
    #     mfcc_2 FLOAT,
    #     mfcc_3 FLOAT,
    #     mfcc_4 FLOAT,
    #     mfcc_5 FLOAT,
    #     mfcc_6 FLOAT,
    #     mfcc_7 FLOAT,
    #     mfcc_8 FLOAT,
    #     mfcc_9 FLOAT,
    #     mfcc_10 FLOAT,
    #     mfcc_11 FLOAT,
    #     mfcc_12 FLOAT,
    #     mfcc_13 FLOAT,
    #     chroma_stft_1 FLOAT,
    #     chroma_stft_2 FLOAT,
    #     chroma_stft_3 FLOAT,
    #     chroma_stft_4 FLOAT,
    #     chroma_stft_5 FLOAT,
    #     chroma_stft_6 FLOAT,
    #     chroma_stft_7 FLOAT,
    #     chroma_stft_8 FLOAT,
    #     chroma_stft_9 FLOAT,
    #     chroma_stft_10 FLOAT,
    #     chroma_stft_11 FLOAT,
    #     chroma_stft_12 FLOAT
    # );
    # """)



    while True:
        cur.execute("SELECT * FROM song_metadata_unanalysed")
        songs = cur.fetchall()

        queue = Queue()
        for song in songs:
            queue.put(song)

        processes=[]
        for i in range(NUM_PROCESSES):
            proc = Process(target=analyse_song, args=(queue,))
            proc.start()
            processes.append(proc)


        for i in range(NUM_PROCESSES):
            queue.put(None)

        for proc in processes:
            proc.join()

        break