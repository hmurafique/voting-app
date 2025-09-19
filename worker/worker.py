import redis
import psycopg2
import time

r = redis.Redis(host='redis', port=6379)
conn = psycopg2.connect("dbname=votes user=postgres password=postgres host=db")
cur = conn.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS votes (vote TEXT PRIMARY KEY, count INT)")
conn.commit()

while True:
    for vote in ['cats', 'dogs']:
        val = r.get(vote)
        if val:
            cur.execute("INSERT INTO votes (vote, count) VALUES (%s, %s) ON CONFLICT (vote) DO UPDATE SET count = votes.count + EXCLUDED.count", (vote, int(val)))
            conn.commit()
            r.set(vote, 0)
    time.sleep(5)
