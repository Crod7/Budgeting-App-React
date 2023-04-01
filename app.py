from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

@app.route('/')
def index():
    # connect to the database
    cnx = mysql.connector.connect(user='u883076059_admin', password='Admin123!',
                                  host='191.101.13.1', database='u883076059_OnlineDatabase')
    cursor = cnx.cursor()

    # execute the SQL query
    query = "SELECT * FROM Users"
    cursor.execute(query)

    # fetch the results
    rows = cursor.fetchall()

    # convert the results to a list of dictionaries
    results = []
    for row in rows:
        result = {}
        result['id'] = row[0]
        result['name'] = row[1]
        result['password'] = row[2]
        result['createDate'] = row[3]
        results.append(result)

    # close the database connection
    cursor.close()
    cnx.close()

    # return the results as a JSON response
    response = jsonify(results)
    return response

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True)