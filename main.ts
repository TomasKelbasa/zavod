radio.setGroup(8)
let probihazavod = false
let konec = false
let probehnuto = false
let casstartu = 0
let caskonce = 0
basic.clearScreen()
basic.forever(function on_forever() {
    
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    RunComp.SetLightLevel()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    basic.showNumber((caskonce - casstartu) / 1000)
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
            probihazavod = false
            caskonce = control.millis()
        } else {
            radio.sendNumber(1)
            music.playTone(Note.C, music.beat())
            probihazavod = true
        }
        
    }
    
    probehnuto = true
})
