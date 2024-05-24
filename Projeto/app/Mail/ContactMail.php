<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $details;

    public function __construct($details)
    {
        $this->details = $details;
    }
    public function build()
    {
        return $this->subject($this->details['subject'])
                    ->html('
                        <p><strong>Email:</strong> ' . $this->details['email'] . '</p>
                        <p><strong>Mensagem:</strong> ' . $this->details['message'] . '</p>
                    ');
    }
}


