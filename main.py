radio.set_group(8)
probihazavod = False
probehnuto = False
casstartu, caskonce = 0, 0
basic.clear_screen()

def on_forever():
    pass
basic.forever(on_forever)

def on_button_pressed_a():
    RunComp.set_light_level()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    basic.show_number((caskonce-casstartu)/100)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_number(receivedNumber):
    global probihazavod, casstartu
    if receivedNumber == 1:
        probihazavod = True
        casstartu = control.millis()
radio.on_received_number(on_received_number)

def on_light_drop():
    global probehnuto, casstartu, caskonce
    if not probehnuto:
        if probihazavod:
            music.play_tone(Note.C, music.beat())
            caskonce = control.millis()
        else:
            radio.send_number(1)
            music.play_tone(Note.E, music.beat())
    probehnuto = True
RunComp.on_light_drop(on_light_drop)