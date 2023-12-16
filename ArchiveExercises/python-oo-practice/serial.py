"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    
    def __init__(self, starting=0):
        self.starting = self.next = starting

    def __repr__(self):
        return f"<SerialGenerator start={self.starting} next={self.next}>"

    def generate(self):
        self.next += 1
        return self.next
    
    def reset(self):
        self.next = self.starting
