grid1 = '003020600900305001001806400008102900700000008006708200002609500800203009005010300'
grid2 = '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......'
hard1 = '.....6....59.....82....8....45........3........6..3.54...325..6..................'


def cross(A, B):
    "Cross product of elements in A and elements in B."
    return [a + b for a in A for b in B]


digits = '123456789'
rows = 'ABCDEFGHI'
cols = digits
squares = cross(rows, cols)
unitlist = ([cross(rows, c) for c in cols] +
            [cross(r, cols) for r in rows] +
            [cross(rs, cs) for rs in ('ABC', 'DEF', 'GHI') for cs in ('123', '456', '789')])

# map squares to unitlist
units = dict((s, [u for u in unitlist if s in u])
             for s in squares)
peers = dict((s, set(sum(units[s], [])) - set([s]))
             for s in squares)


def assign(values, s, d):
    other_values = values[s].replace(d, '')

    if not all(eliminate(values, s, d2) for d2 in other_values):
        return False
    return values


def eliminate(values, s, d):
    if d not in values[s]:
        return values

    values[s] = values[s].replace(d, '')

    if len(values[s]) == 0:
        return False


    # if value reduced to one spot, eliminate value from peers

    elif len(values[s]) == 1:
        d2 = values[s]

        if not all(eliminate(values, s2, d2) for s2 in peers[s]):
            return False

    for u in units[s]:

        # if unit u is reduced to one value d, , put it therre

        dplaces = [s for s in units[s] if d in u]

        if len(dplaces) == 0:
            return False

        elif len(dplaces) == 1:
            if not assign(values, dplaces[0], d):
                return False
    return values
