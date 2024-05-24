<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);
// cria um array e passa as informacoes pra esse array
        $details = [
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
        ];

        Mail::to('recipient@example.com')->send(new ContactMail($details));

        return response()->json(['message' => 'Email sent successfully']);
    }
}
