radio.setGroup(8)
let probihazavod = false
let probehnuto = false
let casstartu = 0
let caskonce = 0
basic.clearScreen()
basic.forever(function on_forever() {
    if (input.logoIsPressed()) {
        radio.sendNumber(0)
        music.playTone(Note.Bb, music.beat())
        control.reset()
    }
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    RunComp.SetLightLevel()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    basic.showNumber((caskonce - casstartu) / 1000)
})
radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    if (receivedNumber == 0) {
        music.playTone(Note.Bb, music.beat())
        control.reset()
    }
    
    if (receivedNumber == 1) {
        probihazavod = true
        casstartu = control.millis()
    }
    
    if (receivedNumber == 2) {
        probihazavod = false
        caskonce = control.millis()
    }
    
})
RunComp.OnLightDrop(function on_light_drop() {
    
    if (!probehnuto) {
        if (probihazavod) {
            music.playTone(Note.C, music.beat())
            radio.sendNumber(2)
            caskonce = control.millis()
        } else {
            casstartu = control.millis()
            radio.sendNumber(1)
            music.playTone(Note.E, music.beat())
        }
        
    }
    
    probehnuto = true
})
