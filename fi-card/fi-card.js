// Generate BBCode based on the form inputs
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('uofForm');
    const bbcodeOutput = document.getElementById('bbcodeOutput');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Define bbcodeTemplate here to ensure it's initialized before use
        const bbcodeTemplate = `[divbox2=white][color=transparent]spacer[/color]
[aligntable=right,0,0,15,0,0,transparent]FIELD INTERVIEW CARD[/aligntable]

[b]SUBJECT INFORMATION[/b]
Name: ${document.getElementById('name').value}
Phone: ${document.getElementById('phone').value}
Sex: ${document.getElementById('sex').value}
Hair: ${document.getElementById('hair').value}
Eyes: ${document.getElementById('eyes').value}

[b]RESIDENCE & BIRTH INFO[/b]
Residence: ${document.getElementById('residence').value}
Birthdate: ${document.getElementById('birthdate').value}
Descent: ${document.getElementById('descent').value}
Height: ${document.getElementById('height').value}

[b]CLOTHING & ODDITIES[/b]
Clothing: ${document.getElementById('clothing').value}
Personal Oddities: ${document.getElementById('personalOddities').value}

[b]MONIKER & GANG[/b]
Moniker / Alias: ${document.getElementById('moniker').value}
Gang / Club: ${document.getElementById('gang').value}

[b]SUBJECT INFO[/b]
Loiterer: ${document.getElementById('loiterer').checked ? 'Yes' : 'No'}
Prowler: ${document.getElementById('prowler').checked ? 'Yes' : 'No'}
Homeless: ${document.getElementById('homeless').checked ? 'Yes' : 'No'}
Witness: ${document.getElementById('witness').checked ? 'Yes' : 'No'}
Gang Activity: ${document.getElementById('gangActivity').checked ? 'Yes' : 'No'}
Has Record: ${document.getElementById('hasRecord').checked ? 'Yes' : 'No'}
On Parole: ${document.getElementById('onParole').checked ? 'Yes' : 'No'}
On Probation: ${document.getElementById('onProbation').checked ? 'Yes' : 'No'}
Driver: ${document.getElementById('driver').checked ? 'Yes' : 'No'}
Passenger: ${document.getElementById('passenger').checked ? 'Yes' : 'No'}

[b]VEHICLE INFO[/b]
Vehicle Make: ${document.getElementById('vehMake').value}
Vehicle Model: ${document.getElementById('vehModel').value}
Vehicle Type: ${document.getElementById('vehType').value}
Vehicle Color: ${document.getElementById('vehColor').value}
Vehicle License No.: ${document.getElementById('vehLic').value}

[b]BODY AND WINDOW INFO[/b]
Body Damage: ${document.getElementById('bodyDamage').checked ? 'Yes' : 'No'}
Body Modified: ${document.getElementById('bodyModified').checked ? 'Yes' : 'No'}
Body Sticker: ${document.getElementById('bodySticker').checked ? 'Yes' : 'No'}
Left Side: ${document.getElementById('bodyLeft').checked ? 'Yes' : 'No'}
Right Side: ${document.getElementById('bodyRight').checked ? 'Yes' : 'No'}
Front: ${document.getElementById('bodyFront').checked ? 'Yes' : 'No'}
Rear: ${document.getElementById('bodyRear').checked ? 'Yes' : 'No'}

Window Damage: ${document.getElementById('windowDamage').checked ? 'Yes' : 'No'}
Window Tint: ${document.getElementById('windowTint').checked ? 'Yes' : 'No'}
Left Side: ${document.getElementById('windowLeft').checked ? 'Yes' : 'No'}
Right Side: ${document.getElementById('windowRight').checked ? 'Yes' : 'No'}
Front: ${document.getElementById('windowFront').checked ? 'Yes' : 'No'}
Rear: ${document.getElementById('windowRear').checked ? 'Yes' : 'No'}

[b]GENERATED BBCode[/b]
[bbcode]${bbcodeTemplate}[/bbcode]
`;

        // Display the generated BBCode
        bbcodeOutput.textContent = bbcodeTemplate;

        // Select the generated BBCode for easy copying
        const range = document.createRange();
        range.selectNodeContents(bbcodeOutput);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });
});
