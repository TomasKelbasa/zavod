radio.setGroup(8)
let probihazavod = false
let probehnuto = false
let [casstartu, caskonce] = [0, 0]
basic.clearScreen()
basic.forever(function on_forever() {
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    RunComp.SetLightLevel()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    basic.showNumber((caskonce - casstartu) / 100)
})
radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    if (receivedNumber == 1) {
        probihazavod = true
        casstartu = control.millis()
    }
    
})
RunComp.OnLightDrop(function on_light_drop() {
    
    if (!probehnuto) {
        if (probihazavod) {
            music.playTone(Note.C, music.beat())
            caskonce = control.millis()
        } else {
            radio.sendNumber(1)
            music.playTone(Note.E, music.beat())
        }
        
    }
    
    probehnuto = true
})
