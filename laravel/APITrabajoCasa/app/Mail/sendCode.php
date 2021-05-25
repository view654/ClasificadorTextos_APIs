<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class sendCode extends Mailable
{
    use Queueable, SerializesModels;

    public $subject = "Recuperar contraseña";
    public $codigo;
    

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($codigo)
    {
        $this -> codigo = $codigo;
    }

    /**
     * Build the message.
     *
     * @return $this
     */



    

    public function build()
    {
        return $this->view('emails.sendCodeView');
        //return $this->view('view.name');
    }
}
