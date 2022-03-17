radio.setGroup(8)
let probihazavod = false
let probehnuto = false
let casstartu = 0
let caskonce = 0
init()
function init() {
    let probihazavod = false
    let probehnuto = false
    let casstartu = 0
    let caskonce = 0
    basic.clearScreen()
    on_button_pressed_a()
}

basic.forever(function on_forever() {
    
})
input.onLogoEvent(TouchButtonEvent.Touched, function on_logo_event_touched() {
    radio.sendNumber(0)
    music.playTone(Note.Bb, music.beat())
    init()
})
function on_button_pressed_a() {
    RunComp.SetLightLevel()
}

input.onButtonPressed(Button.A, on_button_pressed_a)
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    if (probehnuto && !probihazavod) {
        basic.showNumber((caskonce - casstartu) / 1000)
    }
    
})
radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    if (receivedNumber == 0) {
        music.playTone(Note.Bb, music.beat())
        init()
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
            probihazavod = false
        } else {
            casstartu = control.millis()
            radio.sendNumber(1)
            music.playTone(Note.E, music.beat())
            probihazavod = true
        }
        
    }
    
    probehnuto = true
})
