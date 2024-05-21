<?php


namespace App\Http\Controllers;

use Inertia\Inertia;

class DocumentController extends Controller
{
    public function show()
    {
        // Dados fictícios, substitua pela lógica de obtenção dos dados reais
        $documents = [
            'encaminhamentos' => 'Conteúdo inicial do encaminhamento...',
            'atestados' => 'Conteúdo inicial do atestado...'
        ];

        return Inertia::render('DocumentEditor', [
            'documents' => $documents
        ]);
    }

    public function update(Request $request)
    {
        // Lógica para salvar os documentos editados
        // Por exemplo, salvar em um banco de dados ou sistema de arquivos

        return response()->json(['message' => 'Documentos atualizados com sucesso!']);
    }
}
