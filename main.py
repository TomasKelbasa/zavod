radio.set_group(8)
probihazavod = False
probehnuto = False
casstartu = 0
caskonce = 0
basic.clear_screen()

def on_forever():
    if input.logo_is_pressed():
        radio.send_number(0)
        music.play_tone(Note.BB, music.beat())
        control.reset()
basic.forever(on_forever)

def on_button_pressed_a():
    RunComp.set_light_level()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    basic.show_number((caskonce - casstartu) / 1000)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_number(receivedNumber):
    global probihazavod, casstartu, caskonce
    if receivedNumber == 0:
        music.play_tone(Note.BB, music.beat())
        control.reset()
    if receivedNumber == 1:
        probihazavod = True
        casstartu = control.millis()
    if receivedNumber == 2:
        probihazavod = False
        caskonce = control.millis()
radio.on_received_number(on_received_number)

def on_light_drop():
    global probehnuto, caskonce, casstartu
    if not probehnuto:
        if probihazavod:
            music.play_tone(Note.C, music.beat())
            radio.send_number(2)
            caskonce = control.millis()
        else:
            casstartu = control.millis()
            radio.send_number(1)
            music.play_tone(Note.E, music.beat())
    probehnuto = True
RunComp.on_light_drop(on_light_drop)
