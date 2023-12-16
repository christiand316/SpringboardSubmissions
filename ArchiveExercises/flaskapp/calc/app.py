from flask import Flask, request

app = Flask(__name__)

@app.route("/add")
def calc_add():
    """Add a and b parameters."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = add(a, b)

    return str(result)


@app.route("/mult")
def calc_mult():
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = mult(a, b)

    return str(result)

@app.route("/div")
def calc_div():
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = div(a, b)

    return str(result)

@app.route("/sub")
def calc_sub():
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    result = sub(a, b)

    return str(result)
"""
functions for add,sub,mult,and division operations 
"""

def add(a, b):
    """Add a and b."""
    
    return a + b

def sub(a, b):
    """Substract b from a."""

    return a - b

def mult(a, b):
    """Multiply a and b."""

    return a * b

def div(a, b):
    """Divide a by b."""

    return a / b