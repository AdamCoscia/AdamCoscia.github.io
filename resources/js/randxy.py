import sys
import math
import random

def randxy(x, y):
    """Prints random integer between x and y."""
    return math.floor(random.random() * (y - x) ) + x

if __name__ == "__main__":
    x = int(sys.argv[1].strip())

    y = int(sys.argv[2].strip())

    val = randxy(x, y)

    print(f'Random int between {x} and {y}: {val}')
